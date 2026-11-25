"""Generates the six treatment-icon Lottie animations (100x100, 60fps)."""
import json, math, os, sys

OUT = sys.argv[1]
TEAL = [0.059, 0.478, 0.478, 1]
SOFT = [0.62, 0.82, 0.81, 1]
EASE = {"i": {"x": 0.45, "y": 1}, "o": {"x": 0.55, "y": 0}}
LIN = {"i": {"x": 1, "y": 1}, "o": {"x": 0, "y": 0}}


def st(v):
    return {"a": 0, "k": v}


def anim(frames, ease=EASE):
    """frames: list of (t, value). value scalar or list."""
    ks = []
    for n, (t, v) in enumerate(frames):
        v = v if isinstance(v, list) else [v]
        k = {"t": t, "s": v}
        if n < len(frames) - 1:
            k.update({"i": dict(ease["i"]), "o": dict(ease["o"])})
        ks.append(k)
    return {"a": 1, "k": ks}


def tr(p=(0, 0), a=(0, 0), s=100, r=0, o=100):
    def wrap(v, dims=None):
        if isinstance(v, dict):
            return v
        if dims == 2:
            return st(list(v))
        return st(v)
    return {"ty": "tr",
            "p": wrap(p, 2), "a": wrap(a, 2),
            "s": s if isinstance(s, dict) else st([s, s]),
            "r": wrap(r), "o": wrap(o), "sk": st(0), "sa": st(0)}


def stroke(c=TEAL, w=4, o=100):
    return {"ty": "st", "c": st(c), "o": o if isinstance(o, dict) else st(o), "w": st(w), "lc": 2, "lj": 2, "ml": 4}


def fill(c=TEAL, o=100):
    return {"ty": "fl", "c": st(c), "o": o if isinstance(o, dict) else st(o), "r": 1}


def rect(w, h, r, p=(0, 0)):
    return {"ty": "rc", "d": 1, "p": st(list(p)), "s": st([w, h]), "r": st(r)}


def ell(d, p=(0, 0)):
    return {"ty": "el", "d": 1, "p": st(list(p)), "s": st([d, d])}


def path(pts, closed=False, curves=None):
    n = len(pts)
    i = [[0, 0]] * n
    o = [[0, 0]] * n
    if curves:
        i, o = curves
    return {"ty": "sh", "ks": st({"c": closed, "v": [list(p) for p in pts], "i": i, "o": o})}


def trim(s, e, off=0):
    w = lambda v: v if isinstance(v, dict) else st(v)
    return {"ty": "tm", "s": w(s), "e": w(e), "o": w(off), "m": 1}


def group(items, t=None):
    return {"ty": "gr", "it": items + [t or tr()]}


def doc(name, groups, op=120):
    return {"v": "5.7.4", "fr": 60, "ip": 0, "op": op, "w": 100, "h": 100, "nm": name, "ddd": 0, "assets": [],
            "layers": [{"ddd": 0, "ind": 1, "ty": 4, "nm": name, "sr": 1, "ao": 0, "ip": 0, "op": op, "st": 0, "bm": 0,
                        "ks": {"o": st(100), "r": st(0), "p": st([0, 0, 0]), "a": st([0, 0, 0]), "s": st([100, 100, 100])},
                        "shapes": list(reversed(groups))}]}  # first listed = bottom


def wave(base, amp, phase, op=120, step=15, axis=0):
    out = []
    for t in range(0, op + 1, step):
        d = amp * math.sin(phase + 2 * math.pi * t / op)
        v = list(base)
        v[axis] += d
        out.append((t, v))
    return anim(out, LIN)


def spine():
    g = []
    # relief ring
    g.append(group([ell(20), stroke(SOFT, 3)],
                   tr(p=(50, 64), s=anim([(0, [60, 60]), (110, [230, 230]), (120, [230, 230])]),
                      o=anim([(0, 90), (110, 0), (120, 0)]))))
    widths = [16, 20, 23, 24, 21]
    for n, y in enumerate([16, 30, 44, 58, 72]):
        g.append(group([rect(widths[n], 9, 4.5), fill()],
                       tr(p=wave((50, y), 4, -n * 0.75))))
    g.append(group([rect(10, 6, 3), fill(SOFT)], tr(p=(50, 85))))
    return doc("spine", g)


def neck():
    shoulders = path([(18, 90), (50, 68), (82, 90)], curves=(
        [[0, 0], [-18, 0], [-4, -14]], [[4, -14], [18, 0], [0, 0]]))
    g = [group([shoulders, stroke(TEAL, 4.5)])]
    head = group([
        group([path([(50, 68), (50, 52)]), stroke(TEAL, 4.5)]),
        group([ell(26, (50, 37)), stroke(TEAL, 4.5)]),
    ], tr(p=(50, 68), a=(50, 68), r=anim([(0, -11), (60, 11), (120, -11)])))
    g.append(head)
    # motion arcs
    for side, d in ((-1, 0), (1, 60)):
        arc = path([(50 + side * 26, 26), (50 + side * 30, 38)], curves=([[0, 0], [side * 1, -6]], [[side * 3, 3], [0, 0]]))
        g.append(group([arc, stroke(SOFT, 3)],
                       tr(o=anim([(0, 0 if d else 100), (60, 100 if d else 0), (120, 0 if d else 100)]))))
    return doc("neck", g)


def joint():
    g = [group([path([(34, 12), (50, 48)]), stroke(TEAL, 6)])]
    shin = group([
        group([path([(50, 48), (50, 84), (62, 86)]), stroke(TEAL, 6)]),
    ], tr(p=(50, 48), a=(50, 48), r=anim([(0, 0), (50, -48), (70, -48), (120, 0)])))
    g.append(shin)
    g.append(group([ell(14), stroke(SOFT, 3)],
                   tr(p=(50, 48), s=anim([(0, [100, 100]), (60, [190, 190]), (120, [100, 100])]),
                      o=anim([(0, 100), (60, 0), (120, 100)]))))
    g.append(group([ell(13), fill()], tr(p=(50, 48), s=anim([(0, [100, 100]), (55, [118, 118]), (120, [100, 100])]))))
    return doc("joint", g)


def ecg():
    pts = [(8, 58), (30, 58), (37, 58), (43, 36), (51, 78), (58, 46), (63, 58), (92, 58)]
    g = [group([path(pts), stroke(SOFT, 3.5, 45)]),
         group([path(pts), trim(anim([(0, 0), (40, 0), (110, 100), (120, 100)]),
                                anim([(0, 0), (70, 100), (120, 100)])), stroke(TEAL, 4.5)])]
    plus = group([path([(0, -7), (0, 7)]), path([(-7, 0), (7, 0)]), stroke(TEAL, 4)],
                 tr(p=(80, 24), s=anim([(0, [100, 100]), (30, [130, 130]), (60, [100, 100]), (120, [100, 100])]),
                    r=anim([(0, 0), (60, 90), (120, 90)])))
    g.append(plus)
    return doc("ecg", g)


def neuron():
    g = []
    ends = []
    for k in range(6):
        ang = math.radians(-90 + k * 60)
        ex, ey = 50 + 34 * math.cos(ang), 50 + 34 * math.sin(ang)
        ends.append((ex, ey))
        g.append(group([path([(50, 50), (ex, ey)]), stroke(SOFT, 3)]))
        g.append(group([ell(9, (ex, ey)), stroke(TEAL, 3)]))
    for k, (ex, ey) in enumerate(ends):
        s0 = k * 12
        g.append(group([ell(6), fill()], tr(
            p=anim([(0, [50, 50]), (s0, [50, 50]), (s0 + 50, [ex, ey]), (120, [ex, ey])]),
            o=anim([(0, 0), (s0, 0), (s0 + 8, 100), (s0 + 42, 100), (s0 + 50, 0), (120, 0)]))))
    g.append(group([ell(20), fill()], tr(p=(50, 50), s=anim([(0, [100, 100]), (60, [115, 115]), (120, [100, 100])]))))
    return doc("neuron", g)


def vestibular():
    g = []
    for d, turns, w, c in ((72, 1, 4, TEAL), (50, -1, 4, SOFT), (28, 2, 4, TEAL)):
        g.append(group([ell(d), trim(0, 68), stroke(c, w)],
                       tr(p=(50, 50), r=anim([(0, 0), (180, 360 * turns)], LIN))))
    g.append(group([ell(9), fill()], tr(p=(50, 50), s=anim([(0, [100, 100]), (90, [135, 135]), (180, [100, 100])]))))
    return doc("vestibular", g, op=180)


os.makedirs(OUT, exist_ok=True)
for fn in (spine, neck, joint, ecg, neuron, vestibular):
    d = fn()
    with open(os.path.join(OUT, d["nm"] + ".json"), "w") as f:
        json.dump(d, f, separators=(",", ":"))
    print(d["nm"])
