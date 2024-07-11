/**
 * This file is part of the O2System PHP Framework package.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author         Steeve Andrian Salim
 * @copyright      Copyright (c) Steeve Andrian Salim
 */
// ------------------------------------------------------------------------

/**
 * O2System User Interface (UI) Plugins
 */

/*! offline-js 0.7.13 */
(function () {
  var a, b, c, d, e, f, g;
  (d = function (a, b) {
    var c, d, e, f;
    e = [];
    for (d in b.prototype)
      try {
        (f = b.prototype[d]),
          null == a[d] && 'function' != typeof f
            ? e.push((a[d] = f))
            : e.push(void 0);
      } catch (g) {
        c = g;
      }
    return e;
  }),
    (a = {}),
    null == a.options && (a.options = {}),
    (c = {
      checks: {
        xhr: {
          url: function () {
            return '/favicon.ico?_=' + Math.floor(1e9 * Math.random());
          },
          timeout: 5e3,
        },
        image: {
          url: function () {
            return '/favicon.ico?_=' + Math.floor(1e9 * Math.random());
          },
        },
        active: 'xhr',
      },
      checkOnLoad: !1,
      interceptRequests: !0,
      reconnect: !0,
    }),
    (e = function (a, b) {
      var c, d, e, f, g, h;
      for (
        c = a, h = b.split('.'), d = e = 0, f = h.length;
        f > e && ((g = h[d]), (c = c[g]), 'object' == typeof c);
        d = ++e
      );
      return d === h.length - 1 ? c : void 0;
    }),
    (a.getOption = function (b) {
      var d, f;
      return (
        (f = null != (d = e(a.options, b)) ? d : e(c, b)),
        'function' == typeof f ? f() : f
      );
    }),
    'function' == typeof window.addEventListener &&
      window.addEventListener(
        'online',
        function () {
          return setTimeout(a.confirmUp, 100);
        },
        !1
      ),
    'function' == typeof window.addEventListener &&
      window.addEventListener(
        'offline',
        function () {
          return a.confirmDown();
        },
        !1
      ),
    (a.state = 'up'),
    (a.markUp = function () {
      return (
        a.trigger('confirmed-up'),
        'up' !== a.state ? ((a.state = 'up'), a.trigger('up')) : void 0
      );
    }),
    (a.markDown = function () {
      return (
        a.trigger('confirmed-down'),
        'down' !== a.state ? ((a.state = 'down'), a.trigger('down')) : void 0
      );
    }),
    (f = {}),
    (a.on = function (b, c, d) {
      var e, g, h, i, j;
      if (((g = b.split(' ')), g.length > 1)) {
        for (j = [], h = 0, i = g.length; i > h; h++)
          (e = g[h]), j.push(a.on(e, c, d));
        return j;
      }
      return null == f[b] && (f[b] = []), f[b].push([d, c]);
    }),
    (a.off = function (a, b) {
      var c, d, e, g, h;
      if (null != f[a]) {
        if (b) {
          for (e = 0, h = []; e < f[a].length; )
            (g = f[a][e]),
              (d = g[0]),
              (c = g[1]),
              c === b ? h.push(f[a].splice(e, 1)) : h.push(e++);
          return h;
        }
        return (f[a] = []);
      }
    }),
    (a.trigger = function (a) {
      var b, c, d, e, g, h, i;
      if (null != f[a]) {
        for (g = f[a], i = [], d = 0, e = g.length; e > d; d++)
          (h = g[d]), (b = h[0]), (c = h[1]), i.push(c.call(b));
        return i;
      }
    }),
    (b = function (a, b, c) {
      var d, e, f, g, h;
      return (
        (h = function () {
          return a.status && a.status < 12e3 ? b() : c();
        }),
        null === a.onprogress
          ? ((d = a.onerror),
            (a.onerror = function () {
              return (
                c(), 'function' == typeof d ? d.apply(null, arguments) : void 0
              );
            }),
            (g = a.ontimeout),
            (a.ontimeout = function () {
              return (
                c(), 'function' == typeof g ? g.apply(null, arguments) : void 0
              );
            }),
            (e = a.onload),
            (a.onload = function () {
              return (
                h(), 'function' == typeof e ? e.apply(null, arguments) : void 0
              );
            }))
          : ((f = a.onreadystatechange),
            (a.onreadystatechange = function () {
              return (
                4 === a.readyState ? h() : 0 === a.readyState && c(),
                'function' == typeof f ? f.apply(null, arguments) : void 0
              );
            }))
      );
    }),
    (a.checks = {}),
    (a.checks.xhr = function () {
      var c, d;
      (d = new XMLHttpRequest()),
        (d.offline = !1),
        d.open('HEAD', a.getOption('checks.xhr.url'), !0),
        null != d.timeout && (d.timeout = a.getOption('checks.xhr.timeout')),
        b(d, a.markUp, a.markDown);
      try {
        d.send();
      } catch (e) {
        (c = e), a.markDown();
      }
      return d;
    }),
    (a.checks.image = function () {
      var b;
      return (
        (b = document.createElement('img')),
        (b.onerror = a.markDown),
        (b.onload = a.markUp),
        void (b.src = a.getOption('checks.image.url'))
      );
    }),
    (a.checks.down = a.markDown),
    (a.checks.up = a.markUp),
    (a.check = function () {
      return a.trigger('checking'), a.checks[a.getOption('checks.active')]();
    }),
    (a.confirmUp = a.confirmDown = a.check),
    (a.onXHR = function (a) {
      var b, c, e;
      return (
        (e = function (b, c) {
          var d;
          return (
            (d = b.open),
            (b.open = function (e, f, g, h, i) {
              return (
                a({
                  type: e,
                  url: f,
                  async: g,
                  flags: c,
                  user: h,
                  password: i,
                  xhr: b,
                }),
                d.apply(b, arguments)
              );
            })
          );
        }),
        (c = window.XMLHttpRequest),
        (window.XMLHttpRequest = function (a) {
          var b, d, f;
          return (
            (f = new c(a)),
            e(f, a),
            (d = f.setRequestHeader),
            (f.headers = {}),
            (f.setRequestHeader = function (a, b) {
              return (f.headers[a] = b), d.call(f, a, b);
            }),
            (b = f.overrideMimeType),
            (f.overrideMimeType = function (a) {
              return (f.mimeType = a), b.call(f, a);
            }),
            f
          );
        }),
        d(window.XMLHttpRequest, c),
        null != window.XDomainRequest
          ? ((b = window.XDomainRequest),
            (window.XDomainRequest = function () {
              var a;
              return (a = new b()), e(a), a;
            }),
            d(window.XDomainRequest, b))
          : void 0
      );
    }),
    (g = function () {
      return (
        a.getOption('interceptRequests') &&
          a.onXHR(function (c) {
            var d;
            return (
              (d = c.xhr),
              d.offline !== !1 ? b(d, a.markUp, a.confirmDown) : void 0
            );
          }),
        a.getOption('checkOnLoad') ? a.check() : void 0
      );
    }),
    setTimeout(g, 0),
    (window.Offline = a);
}).call(this),
  function () {
    var a, b, c, d, e, f, g, h, i;
    if (!window.Offline)
      throw new Error('Offline Reconnect brought in without offline.js');
    (d = Offline.reconnect = {}),
      (f = null),
      (e = function () {
        var a;
        return (
          null != d.state &&
            'inactive' !== d.state &&
            Offline.trigger('reconnect:stopped'),
          (d.state = 'inactive'),
          (d.remaining = d.delay =
            null != (a = Offline.getOption('reconnect.initialDelay')) ? a : 3)
        );
      }),
      (b = function () {
        var a, b;
        return (
          (a =
            null != (b = Offline.getOption('reconnect.delay'))
              ? b
              : Math.min(Math.ceil(1.5 * d.delay), 3600)),
          (d.remaining = d.delay = a)
        );
      }),
      (g = function () {
        return 'connecting' !== d.state
          ? ((d.remaining -= 1),
            Offline.trigger('reconnect:tick'),
            0 === d.remaining ? h() : void 0)
          : void 0;
      }),
      (h = function () {
        return 'waiting' === d.state
          ? (Offline.trigger('reconnect:connecting'),
            (d.state = 'connecting'),
            Offline.check())
          : void 0;
      }),
      (a = function () {
        return Offline.getOption('reconnect')
          ? (e(),
            (d.state = 'waiting'),
            Offline.trigger('reconnect:started'),
            (f = setInterval(g, 1e3)))
          : void 0;
      }),
      (i = function () {
        return null != f && clearInterval(f), e();
      }),
      (c = function () {
        return Offline.getOption('reconnect') && 'connecting' === d.state
          ? (Offline.trigger('reconnect:failure'), (d.state = 'waiting'), b())
          : void 0;
      }),
      (d.tryNow = h),
      e(),
      Offline.on('down', a),
      Offline.on('confirmed-down', c),
      Offline.on('up', i);
  }.call(this),
  function () {
    var a, b, c, d, e, f;
    if (!window.Offline)
      throw new Error('Requests module brought in without offline.js');
    (c = []),
      (f = !1),
      (d = function (a) {
        return (
          Offline.trigger('requests:capture'),
          'down' !== Offline.state && (f = !0),
          c.push(a)
        );
      }),
      (e = function (a) {
        var b, c, d, e, f, g, h, i, j;
        (j = a.xhr),
          (g = a.url),
          (f = a.type),
          (h = a.user),
          (d = a.password),
          (b = a.body),
          j.abort(),
          j.open(f, g, !0, h, d),
          (e = j.headers);
        for (c in e) (i = e[c]), j.setRequestHeader(c, i);
        return j.mimeType && j.overrideMimeType(j.mimeType), j.send(b);
      }),
      (a = function () {
        return (c = []);
      }),
      (b = function () {
        var b, d, f, g, h, i;
        for (
          Offline.trigger('requests:flush'), h = {}, b = 0, f = c.length;
          f > b;
          b++
        )
          (g = c[b]),
            (i = g.url.replace(/(\?|&)_=[0-9]+/, function (a, b) {
              return '?' === b ? b : '';
            })),
            (h[g.type.toUpperCase() + ' - ' + i] = g);
        for (d in h) (g = h[d]), e(g);
        return a();
      }),
      setTimeout(function () {
        return Offline.getOption('requests') !== !1
          ? (Offline.on('confirmed-up', function () {
              return f ? ((f = !1), a()) : void 0;
            }),
            Offline.on('up', b),
            Offline.on('down', function () {
              return (f = !1);
            }),
            Offline.onXHR(function (a) {
              var b, c, e, f, g;
              return (
                (g = a.xhr),
                (e = a.async),
                g.offline !== !1 &&
                ((f = function () {
                  return d(a);
                }),
                (c = g.send),
                (g.send = function (b) {
                  return (a.body = b), c.apply(g, arguments);
                }),
                e)
                  ? null === g.onprogress
                    ? (g.addEventListener('error', f, !1),
                      g.addEventListener('timeout', f, !1))
                    : ((b = g.onreadystatechange),
                      (g.onreadystatechange = function () {
                        return (
                          0 === g.readyState
                            ? f()
                            : 4 === g.readyState &&
                              (0 === g.status || g.status >= 12e3) &&
                              f(),
                          'function' == typeof b
                            ? b.apply(null, arguments)
                            : void 0
                        );
                      }))
                  : void 0
              );
            }),
            (Offline.requests = { flush: b, clear: a }))
          : void 0;
      }, 0);
  }.call(this),
  function () {
    var a, b, c, d, e;
    if (!Offline)
      throw new Error('Offline simulate brought in without offline.js');
    for (d = ['up', 'down'], b = 0, c = d.length; c > b; b++)
      (e = d[b]),
        (document.querySelector("script[data-simulate='" + e + "']") ||
          localStorage.OFFLINE_SIMULATE === e) &&
          (null == Offline.options && (Offline.options = {}),
          null == (a = Offline.options).checks && (a.checks = {}),
          (Offline.options.checks.active = e));
  }.call(this),
  function () {
    var a, b, c, d, e, f, g, h, i, j, k, l, m;
    if (!window.Offline)
      throw new Error('Offline UI brought in without offline.js');
    (b =
      '<div class="offline-ui"><div class="offline-ui-content"></div></div>'),
      (a = '<a href class="offline-ui-retry"></a>'),
      (f = function (a) {
        var b;
        return (
          (b = document.createElement('div')), (b.innerHTML = a), b.children[0]
        );
      }),
      (g = e = null),
      (d = function (a) {
        return k(a), (g.className += ' ' + a);
      }),
      (k = function (a) {
        return (g.className = g.className.replace(
          new RegExp('(^| )' + a.split(' ').join('|') + '( |$)', 'gi'),
          ' '
        ));
      }),
      (i = {}),
      (h = function (a, b) {
        return (
          d(a),
          null != i[a] && clearTimeout(i[a]),
          (i[a] = setTimeout(function () {
            return k(a), delete i[a];
          }, 1e3 * b))
        );
      }),
      (m = function (a) {
        var b, c, d, e;
        d = { day: 86400, hour: 3600, minute: 60, second: 1 };
        for (c in d)
          if (((b = d[c]), a >= b)) return (e = Math.floor(a / b)), [e, c];
        return ['now', ''];
      }),
      (l = function () {
        var c, h;
        return (
          (g = f(b)),
          document.body.appendChild(g),
          null != Offline.reconnect &&
            Offline.getOption('reconnect') &&
            (g.appendChild(f(a)),
            (c = g.querySelector('.offline-ui-retry')),
            (h = function (a) {
              return a.preventDefault(), Offline.reconnect.tryNow();
            }),
            null != c.addEventListener
              ? c.addEventListener('click', h, !1)
              : c.attachEvent('click', h)),
          d('offline-ui-' + Offline.state),
          (e = g.querySelector('.offline-ui-content'))
        );
      }),
      (j = function () {
        return (
          l(),
          Offline.on('up', function () {
            return (
              k('offline-ui-down'),
              d('offline-ui-up'),
              h('offline-ui-up-2s', 2),
              h('offline-ui-up-5s', 5)
            );
          }),
          Offline.on('down', function () {
            return (
              k('offline-ui-up'),
              d('offline-ui-down'),
              h('offline-ui-down-2s', 2),
              h('offline-ui-down-5s', 5)
            );
          }),
          Offline.on('reconnect:connecting', function () {
            return d('offline-ui-connecting'), k('offline-ui-waiting');
          }),
          Offline.on('reconnect:tick', function () {
            var a, b, c;
            return (
              d('offline-ui-waiting'),
              k('offline-ui-connecting'),
              (a = m(Offline.reconnect.remaining)),
              (b = a[0]),
              (c = a[1]),
              e.setAttribute('data-retry-in-value', b),
              e.setAttribute('data-retry-in-unit', c)
            );
          }),
          Offline.on('reconnect:stopped', function () {
            return (
              k('offline-ui-connecting offline-ui-waiting'),
              e.setAttribute('data-retry-in-value', null),
              e.setAttribute('data-retry-in-unit', null)
            );
          }),
          Offline.on('reconnect:failure', function () {
            return (
              h('offline-ui-reconnect-failed-2s', 2),
              h('offline-ui-reconnect-failed-5s', 5)
            );
          }),
          Offline.on('reconnect:success', function () {
            return (
              h('offline-ui-reconnect-succeeded-2s', 2),
              h('offline-ui-reconnect-succeeded-5s', 5)
            );
          })
        );
      }),
      'complete' === document.readyState
        ? j()
        : null != document.addEventListener
          ? document.addEventListener('DOMContentLoaded', j, !1)
          : ((c = document.onreadystatechange),
            (document.onreadystatechange = function () {
              return (
                'complete' === document.readyState && j(),
                'function' == typeof c ? c.apply(null, arguments) : void 0
              );
            }));
  }.call(this);

/*! offline-simulate-ui 0.1.0 */
//(function(){var a,b;if("undefined"==typeof Offline||null===Offline)throw new Error("Offline simulate UI brought in without Offline.js");console.info("The offline.simulate.ui.js module is a development-only resource. Make sure to remove offline.simulate.ui.js in production."),Offline.options.reconnect={initialDelay:60},a=function(){var a,b,c,d;return a='<style>\n  .offline-simulate-ui {\n    position: fixed;\n    z-index: 100000;\n    left: -4px;\n    top: 45%;\n    border: solid 1px rgba(0, 0, 0, 0.15);\n    -webkit-border-radius: 4px 4px 4px 4px;\n    -moz-border-radius: 4px 4px 4px 4px;\n    -ms-border-radius: 4px 4px 4px 4px;\n    -o-border-radius: 4px 4px 4px 4px;\n    border-radius: 4px 4px 4px 4px;\n    font-family: "Lucida Grande", sans-serif;\n    font-size: 12px;\n    padding: 2px;\n    padding-left: 6px;\n    width: 25px;\n    background: #f6f6f6;\n    color: #888888;\n  }\n</style>',d=document.createElement("div"),d.innerHTML=a,document.body.appendChild(d),b='<input type="checkbox" id="offline-simulate-check" title="Simulate online/offline states">',c=document.createElement("div"),c.className="offline-simulate-ui",c.innerHTML=b,document.body.appendChild(c),document.getElementById("offline-simulate-check").addEventListener("click",function(){var a;return null==(a=Offline.options).checks&&(a.checks={}),Offline.options.checks.active=this.checked?"down":"up",Offline.check()})},"interactive"===(b=document.readyState)||"complete"===b?a():document.addEventListener("DOMContentLoaded",a)}).call(this);

/*! pace 1.0.0 */
(function () {
  var a,
    b,
    c,
    d,
    e,
    f,
    g,
    h,
    i,
    j,
    k,
    l,
    m,
    n,
    o,
    p,
    q,
    r,
    s,
    t,
    u,
    v,
    w,
    x,
    y,
    z,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    I,
    J,
    K,
    L,
    M,
    N,
    O,
    P,
    Q,
    R,
    S,
    T,
    U,
    V,
    W,
    X = [].slice,
    Y = {}.hasOwnProperty,
    Z = function (a, b) {
      function c() {
        this.constructor = a;
      }
      for (var d in b) Y.call(b, d) && (a[d] = b[d]);
      return (
        (c.prototype = b.prototype),
        (a.prototype = new c()),
        (a.__super__ = b.prototype),
        a
      );
    },
    $ =
      [].indexOf ||
      function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (b in this && this[b] === a) return b;
        return -1;
      };
  for (
    u = {
      catchupTime: 100,
      initialRate: 0.03,
      minTime: 250,
      ghostTime: 100,
      maxProgressPerFrame: 20,
      easeFactor: 1.25,
      startOnPageLoad: !0,
      restartOnPushState: !0,
      restartOnRequestAfter: 500,
      target: 'body',
      elements: { checkInterval: 100, selectors: ['body'] },
      eventLag: { minSamples: 10, sampleCount: 3, lagThreshold: 3 },
      ajax: { trackMethods: ['GET'], trackWebSockets: !0, ignoreURLs: [] },
    },
      C = function () {
        var a;
        return null !=
          (a =
            'undefined' != typeof performance &&
            null !== performance &&
            'function' == typeof performance.now
              ? performance.now()
              : void 0)
          ? a
          : +new Date();
      },
      E =
        window.requestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame,
      t = window.cancelAnimationFrame || window.mozCancelAnimationFrame,
      null == E &&
        ((E = function (a) {
          return setTimeout(a, 50);
        }),
        (t = function (a) {
          return clearTimeout(a);
        })),
      G = function (a) {
        var b, c;
        return (
          (b = C()),
          (c = function () {
            var d;
            return (
              (d = C() - b),
              d >= 33
                ? ((b = C()),
                  a(d, function () {
                    return E(c);
                  }))
                : setTimeout(c, 33 - d)
            );
          })()
        );
      },
      F = function () {
        var a, b, c;
        return (
          (c = arguments[0]),
          (b = arguments[1]),
          (a = 3 <= arguments.length ? X.call(arguments, 2) : []),
          'function' == typeof c[b] ? c[b].apply(c, a) : c[b]
        );
      },
      v = function () {
        var a, b, c, d, e, f, g;
        for (
          b = arguments[0],
            d = 2 <= arguments.length ? X.call(arguments, 1) : [],
            f = 0,
            g = d.length;
          g > f;
          f++
        )
          if ((c = d[f]))
            for (a in c)
              Y.call(c, a) &&
                ((e = c[a]),
                null != b[a] &&
                'object' == typeof b[a] &&
                null != e &&
                'object' == typeof e
                  ? v(b[a], e)
                  : (b[a] = e));
        return b;
      },
      q = function (a) {
        var b, c, d, e, f;
        for (c = b = 0, e = 0, f = a.length; f > e; e++)
          (d = a[e]), (c += Math.abs(d)), b++;
        return c / b;
      },
      x = function (a, b) {
        var c, d, e;
        if (
          (null == a && (a = 'options'),
          null == b && (b = !0),
          (e = document.querySelector('[data-pace-' + a + ']')))
        ) {
          if (((c = e.getAttribute('data-pace-' + a)), !b)) return c;
          try {
            return JSON.parse(c);
          } catch (f) {
            return (
              (d = f),
              'undefined' != typeof console && null !== console
                ? console.error('Error parsing inline pace options', d)
                : void 0
            );
          }
        }
      },
      g = (function () {
        function a() {}
        return (
          (a.prototype.on = function (a, b, c, d) {
            var e;
            return (
              null == d && (d = !1),
              null == this.bindings && (this.bindings = {}),
              null == (e = this.bindings)[a] && (e[a] = []),
              this.bindings[a].push({ handler: b, ctx: c, once: d })
            );
          }),
          (a.prototype.once = function (a, b, c) {
            return this.on(a, b, c, !0);
          }),
          (a.prototype.off = function (a, b) {
            var c, d, e;
            if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
              if (null == b) return delete this.bindings[a];
              for (c = 0, e = []; c < this.bindings[a].length; )
                e.push(
                  this.bindings[a][c].handler === b
                    ? this.bindings[a].splice(c, 1)
                    : c++
                );
              return e;
            }
          }),
          (a.prototype.trigger = function () {
            var a, b, c, d, e, f, g, h, i;
            if (
              ((c = arguments[0]),
              (a = 2 <= arguments.length ? X.call(arguments, 1) : []),
              null != (g = this.bindings) ? g[c] : void 0)
            ) {
              for (e = 0, i = []; e < this.bindings[c].length; )
                (h = this.bindings[c][e]),
                  (d = h.handler),
                  (b = h.ctx),
                  (f = h.once),
                  d.apply(null != b ? b : this, a),
                  i.push(f ? this.bindings[c].splice(e, 1) : e++);
              return i;
            }
          }),
          a
        );
      })(),
      j = window.Pace || {},
      window.Pace = j,
      v(j, g.prototype),
      D = j.options = v({}, u, window.paceOptions, x()),
      U = ['ajax', 'document', 'eventLag', 'elements'],
      Q = 0,
      S = U.length;
    S > Q;
    Q++
  )
    (K = U[Q]), D[K] === !0 && (D[K] = u[K]);
  (i = (function (a) {
    function b() {
      return (V = b.__super__.constructor.apply(this, arguments));
    }
    return Z(b, a), b;
  })(Error)),
    (b = (function () {
      function a() {
        this.progress = 0;
      }
      return (
        (a.prototype.getElement = function () {
          var a;
          if (null == this.el) {
            if (((a = document.querySelector(D.target)), !a)) throw new i();
            (this.el = document.createElement('div')),
              (this.el.className = 'pace pace-active'),
              (document.body.className = document.body.className.replace(
                /pace-done/g,
                ''
              )),
              (document.body.className += ' pace-running'),
              (this.el.innerHTML =
                '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>'),
              null != a.firstChild
                ? a.insertBefore(this.el, a.firstChild)
                : a.appendChild(this.el);
          }
          return this.el;
        }),
        (a.prototype.finish = function () {
          var a;
          return (
            (a = this.getElement()),
            (a.className = a.className.replace('pace-active', '')),
            (a.className += ' pace-inactive'),
            (document.body.className = document.body.className.replace(
              'pace-running',
              ''
            )),
            (document.body.className += ' pace-done')
          );
        }),
        (a.prototype.update = function (a) {
          return (this.progress = a), this.render();
        }),
        (a.prototype.destroy = function () {
          try {
            this.getElement().parentNode.removeChild(this.getElement());
          } catch (a) {
            i = a;
          }
          return (this.el = void 0);
        }),
        (a.prototype.render = function () {
          var a, b, c, d, e, f, g;
          if (null == document.querySelector(D.target)) return !1;
          for (
            a = this.getElement(),
              d = 'translate3d(' + this.progress + '%, 0, 0)',
              g = ['webkitTransform', 'msTransform', 'transform'],
              e = 0,
              f = g.length;
            f > e;
            e++
          )
            (b = g[e]), (a.children[0].style[b] = d);
          return (
            (!this.lastRenderedProgress ||
              this.lastRenderedProgress | (0 !== this.progress) | 0) &&
              (a.children[0].setAttribute(
                'data-progress-text',
                '' + (0 | this.progress) + '%'
              ),
              this.progress >= 100
                ? (c = '99')
                : ((c = this.progress < 10 ? '0' : ''),
                  (c += 0 | this.progress)),
              a.children[0].setAttribute('data-progress', '' + c)),
            (this.lastRenderedProgress = this.progress)
          );
        }),
        (a.prototype.done = function () {
          return this.progress >= 100;
        }),
        a
      );
    })()),
    (h = (function () {
      function a() {
        this.bindings = {};
      }
      return (
        (a.prototype.trigger = function (a, b) {
          var c, d, e, f, g;
          if (null != this.bindings[a]) {
            for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++)
              (c = f[d]), g.push(c.call(this, b));
            return g;
          }
        }),
        (a.prototype.on = function (a, b) {
          var c;
          return (
            null == (c = this.bindings)[a] && (c[a] = []),
            this.bindings[a].push(b)
          );
        }),
        a
      );
    })()),
    (P = window.XMLHttpRequest),
    (O = window.XDomainRequest),
    (N = window.WebSocket),
    (w = function (a, b) {
      var c, d, e, f;
      f = [];
      for (d in b.prototype)
        try {
          (e = b.prototype[d]),
            f.push(
              null == a[d] && 'function' != typeof e ? (a[d] = e) : void 0
            );
        } catch (g) {
          c = g;
        }
      return f;
    }),
    (A = []),
    (j.ignore = function () {
      var a, b, c;
      return (
        (b = arguments[0]),
        (a = 2 <= arguments.length ? X.call(arguments, 1) : []),
        A.unshift('ignore'),
        (c = b.apply(null, a)),
        A.shift(),
        c
      );
    }),
    (j.track = function () {
      var a, b, c;
      return (
        (b = arguments[0]),
        (a = 2 <= arguments.length ? X.call(arguments, 1) : []),
        A.unshift('track'),
        (c = b.apply(null, a)),
        A.shift(),
        c
      );
    }),
    (J = function (a) {
      var b;
      if ((null == a && (a = 'GET'), 'track' === A[0])) return 'force';
      if (!A.length && D.ajax) {
        if ('socket' === a && D.ajax.trackWebSockets) return !0;
        if (((b = a.toUpperCase()), $.call(D.ajax.trackMethods, b) >= 0))
          return !0;
      }
      return !1;
    }),
    (k = (function (a) {
      function b() {
        var a,
          c = this;
        b.__super__.constructor.apply(this, arguments),
          (a = function (a) {
            var b;
            return (
              (b = a.open),
              (a.open = function (d, e) {
                return (
                  J(d) && c.trigger('request', { type: d, url: e, request: a }),
                  b.apply(a, arguments)
                );
              })
            );
          }),
          (window.XMLHttpRequest = function (b) {
            var c;
            return (c = new P(b)), a(c), c;
          });
        try {
          w(window.XMLHttpRequest, P);
        } catch (d) {}
        if (null != O) {
          window.XDomainRequest = function () {
            var b;
            return (b = new O()), a(b), b;
          };
          try {
            w(window.XDomainRequest, O);
          } catch (d) {}
        }
        if (null != N && D.ajax.trackWebSockets) {
          window.WebSocket = function (a, b) {
            var d;
            return (
              (d = null != b ? new N(a, b) : new N(a)),
              J('socket') &&
                c.trigger('request', {
                  type: 'socket',
                  url: a,
                  protocols: b,
                  request: d,
                }),
              d
            );
          };
          try {
            w(window.WebSocket, N);
          } catch (d) {}
        }
      }
      return Z(b, a), b;
    })(h)),
    (R = null),
    (y = function () {
      return null == R && (R = new k()), R;
    }),
    (I = function (a) {
      var b, c, d, e;
      for (e = D.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++)
        if (((b = e[c]), 'string' == typeof b)) {
          if (-1 !== a.indexOf(b)) return !0;
        } else if (b.test(a)) return !0;
      return !1;
    }),
    y().on('request', function (b) {
      var c, d, e, f, g;
      return (
        (f = b.type),
        (e = b.request),
        (g = b.url),
        I(g)
          ? void 0
          : j.running || (D.restartOnRequestAfter === !1 && 'force' !== J(f))
            ? void 0
            : ((d = arguments),
              (c = D.restartOnRequestAfter || 0),
              'boolean' == typeof c && (c = 0),
              setTimeout(function () {
                var b, c, g, h, i, k;
                if (
                  (b =
                    'socket' === f
                      ? e.readyState < 2
                      : 0 < (h = e.readyState) && 4 > h)
                ) {
                  for (
                    j.restart(), i = j.sources, k = [], c = 0, g = i.length;
                    g > c;
                    c++
                  ) {
                    if (((K = i[c]), K instanceof a)) {
                      K.watch.apply(K, d);
                      break;
                    }
                    k.push(void 0);
                  }
                  return k;
                }
              }, c))
      );
    }),
    (a = (function () {
      function a() {
        var a = this;
        (this.elements = []),
          y().on('request', function () {
            return a.watch.apply(a, arguments);
          });
      }
      return (
        (a.prototype.watch = function (a) {
          var b, c, d, e;
          return (
            (d = a.type),
            (b = a.request),
            (e = a.url),
            I(e)
              ? void 0
              : ((c = 'socket' === d ? new n(b) : new o(b)),
                this.elements.push(c))
          );
        }),
        a
      );
    })()),
    (o = (function () {
      function a(a) {
        var b,
          c,
          d,
          e,
          f,
          g,
          h = this;
        if (((this.progress = 0), null != window.ProgressEvent))
          for (
            c = null,
              a.addEventListener(
                'progress',
                function (a) {
                  return (h.progress = a.lengthComputable
                    ? (100 * a.loaded) / a.total
                    : h.progress + (100 - h.progress) / 2);
                },
                !1
              ),
              g = ['load', 'abort', 'timeout', 'error'],
              d = 0,
              e = g.length;
            e > d;
            d++
          )
            (b = g[d]),
              a.addEventListener(
                b,
                function () {
                  return (h.progress = 100);
                },
                !1
              );
        else
          (f = a.onreadystatechange),
            (a.onreadystatechange = function () {
              var b;
              return (
                0 === (b = a.readyState) || 4 === b
                  ? (h.progress = 100)
                  : 3 === a.readyState && (h.progress = 50),
                'function' == typeof f ? f.apply(null, arguments) : void 0
              );
            });
      }
      return a;
    })()),
    (n = (function () {
      function a(a) {
        var b,
          c,
          d,
          e,
          f = this;
        for (
          this.progress = 0, e = ['error', 'open'], c = 0, d = e.length;
          d > c;
          c++
        )
          (b = e[c]),
            a.addEventListener(
              b,
              function () {
                return (f.progress = 100);
              },
              !1
            );
      }
      return a;
    })()),
    (d = (function () {
      function a(a) {
        var b, c, d, f;
        for (
          null == a && (a = {}),
            this.elements = [],
            null == a.selectors && (a.selectors = []),
            f = a.selectors,
            c = 0,
            d = f.length;
          d > c;
          c++
        )
          (b = f[c]), this.elements.push(new e(b));
      }
      return a;
    })()),
    (e = (function () {
      function a(a) {
        (this.selector = a), (this.progress = 0), this.check();
      }
      return (
        (a.prototype.check = function () {
          var a = this;
          return document.querySelector(this.selector)
            ? this.done()
            : setTimeout(function () {
                return a.check();
              }, D.elements.checkInterval);
        }),
        (a.prototype.done = function () {
          return (this.progress = 100);
        }),
        a
      );
    })()),
    (c = (function () {
      function a() {
        var a,
          b,
          c = this;
        (this.progress =
          null != (b = this.states[document.readyState]) ? b : 100),
          (a = document.onreadystatechange),
          (document.onreadystatechange = function () {
            return (
              null != c.states[document.readyState] &&
                (c.progress = c.states[document.readyState]),
              'function' == typeof a ? a.apply(null, arguments) : void 0
            );
          });
      }
      return (
        (a.prototype.states = { loading: 0, interactive: 50, complete: 100 }), a
      );
    })()),
    (f = (function () {
      function a() {
        var a,
          b,
          c,
          d,
          e,
          f = this;
        (this.progress = 0),
          (a = 0),
          (e = []),
          (d = 0),
          (c = C()),
          (b = setInterval(function () {
            var g;
            return (
              (g = C() - c - 50),
              (c = C()),
              e.push(g),
              e.length > D.eventLag.sampleCount && e.shift(),
              (a = q(e)),
              ++d >= D.eventLag.minSamples && a < D.eventLag.lagThreshold
                ? ((f.progress = 100), clearInterval(b))
                : (f.progress = 100 * (3 / (a + 3)))
            );
          }, 50));
      }
      return a;
    })()),
    (m = (function () {
      function a(a) {
        (this.source = a),
          (this.last = this.sinceLastUpdate = 0),
          (this.rate = D.initialRate),
          (this.catchup = 0),
          (this.progress = this.lastProgress = 0),
          null != this.source && (this.progress = F(this.source, 'progress'));
      }
      return (
        (a.prototype.tick = function (a, b) {
          var c;
          return (
            null == b && (b = F(this.source, 'progress')),
            b >= 100 && (this.done = !0),
            b === this.last
              ? (this.sinceLastUpdate += a)
              : (this.sinceLastUpdate &&
                  (this.rate = (b - this.last) / this.sinceLastUpdate),
                (this.catchup = (b - this.progress) / D.catchupTime),
                (this.sinceLastUpdate = 0),
                (this.last = b)),
            b > this.progress && (this.progress += this.catchup * a),
            (c = 1 - Math.pow(this.progress / 100, D.easeFactor)),
            (this.progress += c * this.rate * a),
            (this.progress = Math.min(
              this.lastProgress + D.maxProgressPerFrame,
              this.progress
            )),
            (this.progress = Math.max(0, this.progress)),
            (this.progress = Math.min(100, this.progress)),
            (this.lastProgress = this.progress),
            this.progress
          );
        }),
        a
      );
    })()),
    (L = null),
    (H = null),
    (r = null),
    (M = null),
    (p = null),
    (s = null),
    (j.running = !1),
    (z = function () {
      return D.restartOnPushState ? j.restart() : void 0;
    }),
    null != window.history.pushState &&
      ((T = window.history.pushState),
      (window.history.pushState = function () {
        return z(), T.apply(window.history, arguments);
      })),
    null != window.history.replaceState &&
      ((W = window.history.replaceState),
      (window.history.replaceState = function () {
        return z(), W.apply(window.history, arguments);
      })),
    (l = { ajax: a, elements: d, document: c, eventLag: f }),
    (B = function () {
      var a, c, d, e, f, g, h, i;
      for (
        j.sources = L = [],
          g = ['ajax', 'elements', 'document', 'eventLag'],
          c = 0,
          e = g.length;
        e > c;
        c++
      )
        (a = g[c]), D[a] !== !1 && L.push(new l[a](D[a]));
      for (
        i = null != (h = D.extraSources) ? h : [], d = 0, f = i.length;
        f > d;
        d++
      )
        (K = i[d]), L.push(new K(D));
      return (j.bar = r = new b()), (H = []), (M = new m());
    })(),
    (j.stop = function () {
      return (
        j.trigger('stop'),
        (j.running = !1),
        r.destroy(),
        (s = !0),
        null != p && ('function' == typeof t && t(p), (p = null)),
        B()
      );
    }),
    (j.restart = function () {
      return j.trigger('restart'), j.stop(), j.start();
    }),
    (j.go = function () {
      var a;
      return (
        (j.running = !0),
        r.render(),
        (a = C()),
        (s = !1),
        (p = G(function (b, c) {
          var d, e, f, g, h, i, k, l, n, o, p, q, t, u, v, w;
          for (
            l = 100 - r.progress, e = p = 0, f = !0, i = q = 0, u = L.length;
            u > q;
            i = ++q
          )
            for (
              K = L[i],
                o = null != H[i] ? H[i] : (H[i] = []),
                h = null != (w = K.elements) ? w : [K],
                k = t = 0,
                v = h.length;
              v > t;
              k = ++t
            )
              (g = h[k]),
                (n = null != o[k] ? o[k] : (o[k] = new m(g))),
                (f &= n.done),
                n.done || (e++, (p += n.tick(b)));
          return (
            (d = p / e),
            r.update(M.tick(b, d)),
            r.done() || f || s
              ? (r.update(100),
                j.trigger('done'),
                setTimeout(
                  function () {
                    return r.finish(), (j.running = !1), j.trigger('hide');
                  },
                  Math.max(D.ghostTime, Math.max(D.minTime - (C() - a), 0))
                ))
              : c()
          );
        }))
      );
    }),
    (j.start = function (a) {
      v(D, a), (j.running = !0);
      try {
        r.render();
      } catch (b) {
        i = b;
      }
      return document.querySelector('.pace')
        ? (j.trigger('start'), j.go())
        : setTimeout(j.start, 50);
    }),
    'function' == typeof define && define.amd
      ? define(function () {
          return j;
        })
      : 'object' == typeof exports
        ? (module.exports = j)
        : D.startOnPageLoad && j.start();
}).call(this);

/* jquery.nicescroll v3.7.6 InuYaksa - MIT - https://nicescroll.areaaperta.com */
!(function (e) {
  'function' == typeof define && define.amd
    ? define(['jquery'], e)
    : 'object' == typeof exports
      ? (module.exports = e(require('jquery')))
      : e(jQuery);
})(function (e) {
  'use strict';
  var o = !1,
    t = !1,
    r = 0,
    i = 2e3,
    s = 0,
    n = e,
    l = document,
    a = window,
    c = n(a),
    d = [],
    u =
      a.requestAnimationFrame ||
      a.webkitRequestAnimationFrame ||
      a.mozRequestAnimationFrame ||
      !1,
    h =
      a.cancelAnimationFrame ||
      a.webkitCancelAnimationFrame ||
      a.mozCancelAnimationFrame ||
      !1;
  if (u) a.cancelAnimationFrame || (h = function (e) {});
  else {
    var p = 0;
    (u = function (e, o) {
      var t = new Date().getTime(),
        r = Math.max(0, 16 - (t - p)),
        i = a.setTimeout(function () {
          e(t + r);
        }, r);
      return (p = t + r), i;
    }),
      (h = function (e) {
        a.clearTimeout(e);
      });
  }
  var m = a.MutationObserver || a.WebKitMutationObserver || !1,
    f =
      Date.now ||
      function () {
        return new Date().getTime();
      },
    g = {
      zindex: 'auto',
      cursoropacitymin: 0,
      cursoropacitymax: 1,
      cursorcolor: '#424242',
      cursorwidth: '6px',
      cursorborder: '1px solid #fff',
      cursorborderradius: '5px',
      scrollspeed: 40,
      mousescrollstep: 27,
      touchbehavior: !1,
      emulatetouch: !1,
      hwacceleration: !0,
      usetransition: !0,
      boxzoom: !1,
      dblclickzoom: !0,
      gesturezoom: !0,
      grabcursorenabled: !0,
      autohidemode: !0,
      background: '',
      iframeautoresize: !0,
      cursorminheight: 32,
      preservenativescrolling: !0,
      railoffset: !1,
      railhoffset: !1,
      bouncescroll: !0,
      spacebarenabled: !0,
      railpadding: { top: 0, right: 0, left: 0, bottom: 0 },
      disableoutline: !0,
      horizrailenabled: !0,
      railalign: 'right',
      railvalign: 'bottom',
      enabletranslate3d: !0,
      enablemousewheel: !0,
      enablekeyboard: !0,
      smoothscroll: !0,
      sensitiverail: !0,
      enablemouselockapi: !0,
      cursorfixedheight: !1,
      directionlockdeadzone: 6,
      hidecursordelay: 400,
      nativeparentscrolling: !0,
      enablescrollonselection: !0,
      overflowx: !0,
      overflowy: !0,
      cursordragspeed: 0.3,
      rtlmode: 'auto',
      cursordragontouch: !1,
      oneaxismousemode: 'auto',
      scriptpath: (function () {
        var e =
            l.currentScript ||
            (function () {
              var e = l.getElementsByTagName('script');
              return !!e.length && e[e.length - 1];
            })(),
          o = e ? e.src.split('?')[0] : '';
        return o.split('/').length > 0
          ? o.split('/').slice(0, -1).join('/') + '/'
          : '';
      })(),
      preventmultitouchscrolling: !0,
      disablemutationobserver: !1,
      enableobserver: !0,
      scrollbarid: !1,
    },
    v = !1,
    w = function () {
      if (v) return v;
      var e = l.createElement('DIV'),
        o = e.style,
        t = navigator.userAgent,
        r = navigator.platform,
        i = {};
      return (
        (i.haspointerlock =
          'pointerLockElement' in l ||
          'webkitPointerLockElement' in l ||
          'mozPointerLockElement' in l),
        (i.isopera = 'opera' in a),
        (i.isopera12 = i.isopera && 'getUserMedia' in navigator),
        (i.isoperamini =
          '[object OperaMini]' === Object.prototype.toString.call(a.operamini)),
        (i.isie = 'all' in l && 'attachEvent' in e && !i.isopera),
        (i.isieold = i.isie && !('msInterpolationMode' in o)),
        (i.isie7 =
          i.isie &&
          !i.isieold &&
          (!('documentMode' in l) || 7 === l.documentMode)),
        (i.isie8 = i.isie && 'documentMode' in l && 8 === l.documentMode),
        (i.isie9 = i.isie && 'performance' in a && 9 === l.documentMode),
        (i.isie10 = i.isie && 'performance' in a && 10 === l.documentMode),
        (i.isie11 = 'msRequestFullscreen' in e && l.documentMode >= 11),
        (i.ismsedge = 'msCredentials' in a),
        (i.ismozilla = 'MozAppearance' in o),
        (i.iswebkit = !i.ismsedge && 'WebkitAppearance' in o),
        (i.ischrome = i.iswebkit && 'chrome' in a),
        (i.ischrome38 = i.ischrome && 'touchAction' in o),
        (i.ischrome22 = !i.ischrome38 && i.ischrome && i.haspointerlock),
        (i.ischrome26 = !i.ischrome38 && i.ischrome && 'transition' in o),
        (i.cantouch =
          'ontouchstart' in l.documentElement || 'ontouchstart' in a),
        (i.hasw3ctouch =
          (a.PointerEvent || !1) &&
          (navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0)),
        (i.hasmstouch = !i.hasw3ctouch && (a.MSPointerEvent || !1)),
        (i.ismac = /^mac$/i.test(r)),
        (i.isios = i.cantouch && /iphone|ipad|ipod/i.test(r)),
        (i.isios4 = i.isios && !('seal' in Object)),
        (i.isios7 = i.isios && 'webkitHidden' in l),
        (i.isios8 = i.isios && 'hidden' in l),
        (i.isios10 = i.isios && a.Proxy),
        (i.isandroid = /android/i.test(t)),
        (i.haseventlistener = 'addEventListener' in e),
        (i.trstyle = !1),
        (i.hastransform = !1),
        (i.hastranslate3d = !1),
        (i.transitionstyle = !1),
        (i.hastransition = !1),
        (i.transitionend = !1),
        (i.trstyle = 'transform'),
        (i.hastransform =
          'transform' in o ||
          (function () {
            for (
              var e = [
                  'msTransform',
                  'webkitTransform',
                  'MozTransform',
                  'OTransform',
                ],
                t = 0,
                r = e.length;
              t < r;
              t++
            )
              if (void 0 !== o[e[t]]) {
                i.trstyle = e[t];
                break;
              }
            i.hastransform = !!i.trstyle;
          })()),
        i.hastransform &&
          ((o[i.trstyle] = 'translate3d(1px,2px,3px)'),
          (i.hastranslate3d = /translate3d/.test(o[i.trstyle]))),
        (i.transitionstyle = 'transition'),
        (i.prefixstyle = ''),
        (i.transitionend = 'transitionend'),
        (i.hastransition =
          'transition' in o ||
          (function () {
            i.transitionend = !1;
            for (
              var e = [
                  'webkitTransition',
                  'msTransition',
                  'MozTransition',
                  'OTransition',
                  'OTransition',
                  'KhtmlTransition',
                ],
                t = ['-webkit-', '-ms-', '-moz-', '-o-', '-o', '-khtml-'],
                r = [
                  'webkitTransitionEnd',
                  'msTransitionEnd',
                  'transitionend',
                  'otransitionend',
                  'oTransitionEnd',
                  'KhtmlTransitionEnd',
                ],
                s = 0,
                n = e.length;
              s < n;
              s++
            )
              if (e[s] in o) {
                (i.transitionstyle = e[s]),
                  (i.prefixstyle = t[s]),
                  (i.transitionend = r[s]);
                break;
              }
            i.ischrome26 && (i.prefixstyle = t[1]),
              (i.hastransition = i.transitionstyle);
          })()),
        (i.cursorgrabvalue = (function () {
          var e = ['grab', '-webkit-grab', '-moz-grab'];
          ((i.ischrome && !i.ischrome38) || i.isie) && (e = []);
          for (var t = 0, r = e.length; t < r; t++) {
            var s = e[t];
            if (((o.cursor = s), o.cursor == s)) return s;
          }
          return 'url(https://cdnjs.cloudflare.com/ajax/libs/slider-pro/1.3.0/css/images/openhand.cur),n-resize';
        })()),
        (i.hasmousecapture = 'setCapture' in e),
        (i.hasMutationObserver = !1 !== m),
        (e = null),
        (v = i),
        i
      );
    },
    b = function (e, p) {
      function v() {
        var e = T.doc.css(P.trstyle);
        return (
          !(!e || 'matrix' != e.substr(0, 6)) &&
          e
            .replace(/^.*\((.*)\)$/g, '$1')
            .replace(/px/g, '')
            .split(/, +/)
        );
      }
      function b() {
        var e = T.win;
        if ('zIndex' in e) return e.zIndex();
        for (; e.length > 0; ) {
          if (9 == e[0].nodeType) return !1;
          var o = e.css('zIndex');
          if (!isNaN(o) && 0 !== o) return parseInt(o);
          e = e.parent();
        }
        return !1;
      }
      function x(e, o, t) {
        var r = e.css(o),
          i = parseFloat(r);
        if (isNaN(i)) {
          var s =
            3 == (i = I[r] || 0)
              ? t
                ? T.win.outerHeight() - T.win.innerHeight()
                : T.win.outerWidth() - T.win.innerWidth()
              : 1;
          return T.isie8 && i && (i += 1), s ? i : 0;
        }
        return i;
      }
      function S(e, o, t, r) {
        T._bind(
          e,
          o,
          function (r) {
            var i = {
              original: (r = r || a.event),
              target: r.target || r.srcElement,
              type: 'wheel',
              deltaMode: 'MozMousePixelScroll' == r.type ? 0 : 1,
              deltaX: 0,
              deltaZ: 0,
              preventDefault: function () {
                return (
                  r.preventDefault ? r.preventDefault() : (r.returnValue = !1),
                  !1
                );
              },
              stopImmediatePropagation: function () {
                r.stopImmediatePropagation
                  ? r.stopImmediatePropagation()
                  : (r.cancelBubble = !0);
              },
            };
            return (
              'mousewheel' == o
                ? (r.wheelDeltaX && (i.deltaX = -0.025 * r.wheelDeltaX),
                  r.wheelDeltaY && (i.deltaY = -0.025 * r.wheelDeltaY),
                  !i.deltaY && !i.deltaX && (i.deltaY = -0.025 * r.wheelDelta))
                : (i.deltaY = r.detail),
              t.call(e, i)
            );
          },
          r
        );
      }
      function z(e, o, t, r) {
        T.scrollrunning ||
          ((T.newscrolly = T.getScrollTop()),
          (T.newscrollx = T.getScrollLeft()),
          (D = f()));
        var i = f() - D;
        if (
          ((D = f()),
          i > 350 ? (A = 1) : (A += (2 - A) / 10),
          (e = (e * A) | 0),
          (o = (o * A) | 0),
          e)
        ) {
          if (r)
            if (e < 0) {
              if (T.getScrollLeft() >= T.page.maxw) return !0;
            } else if (T.getScrollLeft() <= 0) return !0;
          var s = e > 0 ? 1 : -1;
          X !== s &&
            (T.scrollmom && T.scrollmom.stop(),
            (T.newscrollx = T.getScrollLeft()),
            (X = s)),
            (T.lastdeltax -= e);
        }
        if (o) {
          if (
            (function () {
              var e = T.getScrollTop();
              if (o < 0) {
                if (e >= T.page.maxh) return !0;
              } else if (e <= 0) return !0;
            })()
          ) {
            if (M.nativeparentscrolling && t && !T.ispage && !T.zoomactive)
              return !0;
            var n = T.view.h >> 1;
            T.newscrolly < -n
              ? ((T.newscrolly = -n), (o = -1))
              : T.newscrolly > T.page.maxh + n
                ? ((T.newscrolly = T.page.maxh + n), (o = 1))
                : (o = 0);
          }
          var l = o > 0 ? 1 : -1;
          B !== l &&
            (T.scrollmom && T.scrollmom.stop(),
            (T.newscrolly = T.getScrollTop()),
            (B = l)),
            (T.lastdeltay -= o);
        }
        (o || e) &&
          T.synched('relativexy', function () {
            var e = T.lastdeltay + T.newscrolly;
            T.lastdeltay = 0;
            var o = T.lastdeltax + T.newscrollx;
            (T.lastdeltax = 0), T.rail.drag || T.doScrollPos(o, e);
          });
      }
      function k(e, o, t) {
        var r, i;
        return (
          !(t || !q) ||
          (0 === e.deltaMode
            ? ((r = (-e.deltaX * (M.mousescrollstep / 54)) | 0),
              (i = (-e.deltaY * (M.mousescrollstep / 54)) | 0))
            : 1 === e.deltaMode &&
              ((r = ((-e.deltaX * M.mousescrollstep * 50) / 80) | 0),
              (i = ((-e.deltaY * M.mousescrollstep * 50) / 80) | 0)),
          o &&
            M.oneaxismousemode &&
            0 === r &&
            i &&
            ((r = i),
            (i = 0),
            t &&
              (r < 0
                ? T.getScrollLeft() >= T.page.maxw
                : T.getScrollLeft() <= 0) &&
              ((i = r), (r = 0))),
          T.isrtlmode && (r = -r),
          z(r, i, t, !0)
            ? void (t && (q = !0))
            : ((q = !1), e.stopImmediatePropagation(), e.preventDefault()))
        );
      }
      var T = this;
      (this.version = '3.7.6'), (this.name = 'nicescroll'), (this.me = p);
      var E = n('body'),
        M = (this.opt = { doc: E, win: !1 });
      if ((n.extend(M, g), (M.snapbackspeed = 80), e))
        for (var L in M) void 0 !== e[L] && (M[L] = e[L]);
      if (
        (M.disablemutationobserver && (m = !1),
        (this.doc = M.doc),
        (this.iddoc = this.doc && this.doc[0] ? this.doc[0].id || '' : ''),
        (this.ispage = /^BODY|HTML/.test(
          M.win ? M.win[0].nodeName : this.doc[0].nodeName
        )),
        (this.haswrapper = !1 !== M.win),
        (this.win = M.win || (this.ispage ? c : this.doc)),
        (this.docscroll = this.ispage && !this.haswrapper ? c : this.win),
        (this.body = E),
        (this.viewport = !1),
        (this.isfixed = !1),
        (this.iframe = !1),
        (this.isiframe =
          'IFRAME' == this.doc[0].nodeName && 'IFRAME' == this.win[0].nodeName),
        (this.istextarea = 'TEXTAREA' == this.win[0].nodeName),
        (this.forcescreen = !1),
        (this.canshowonmouseevent = 'scroll' != M.autohidemode),
        (this.onmousedown = !1),
        (this.onmouseup = !1),
        (this.onmousemove = !1),
        (this.onmousewheel = !1),
        (this.onkeypress = !1),
        (this.ongesturezoom = !1),
        (this.onclick = !1),
        (this.onscrollstart = !1),
        (this.onscrollend = !1),
        (this.onscrollcancel = !1),
        (this.onzoomin = !1),
        (this.onzoomout = !1),
        (this.view = !1),
        (this.page = !1),
        (this.scroll = { x: 0, y: 0 }),
        (this.scrollratio = { x: 0, y: 0 }),
        (this.cursorheight = 20),
        (this.scrollvaluemax = 0),
        'auto' == M.rtlmode)
      ) {
        var C = this.win[0] == a ? this.body : this.win,
          N =
            C.css('writing-mode') ||
            C.css('-webkit-writing-mode') ||
            C.css('-ms-writing-mode') ||
            C.css('-moz-writing-mode');
        'horizontal-tb' == N || 'lr-tb' == N || '' === N
          ? ((this.isrtlmode = 'rtl' == C.css('direction')),
            (this.isvertical = !1))
          : ((this.isrtlmode =
              'vertical-rl' == N || 'tb' == N || 'tb-rl' == N || 'rl-tb' == N),
            (this.isvertical =
              'vertical-rl' == N || 'tb' == N || 'tb-rl' == N));
      } else (this.isrtlmode = !0 === M.rtlmode), (this.isvertical = !1);
      if (
        ((this.scrollrunning = !1),
        (this.scrollmom = !1),
        (this.observer = !1),
        (this.observerremover = !1),
        (this.observerbody = !1),
        !1 !== M.scrollbarid)
      )
        this.id = M.scrollbarid;
      else
        do {
          this.id = 'ascrail' + i++;
        } while (l.getElementById(this.id));
      (this.rail = !1),
        (this.cursor = !1),
        (this.cursorfreezed = !1),
        (this.selectiondrag = !1),
        (this.zoom = !1),
        (this.zoomactive = !1),
        (this.hasfocus = !1),
        (this.hasmousefocus = !1),
        (this.railslocked = !1),
        (this.locked = !1),
        (this.hidden = !1),
        (this.cursoractive = !0),
        (this.wheelprevented = !1),
        (this.overflowx = M.overflowx),
        (this.overflowy = M.overflowy),
        (this.nativescrollingarea = !1),
        (this.checkarea = 0),
        (this.events = []),
        (this.saved = {}),
        (this.delaylist = {}),
        (this.synclist = {}),
        (this.lastdeltax = 0),
        (this.lastdeltay = 0),
        (this.detected = w());
      var P = n.extend({}, this.detected);
      (this.canhwscroll = P.hastransform && M.hwacceleration),
        (this.ishwscroll = this.canhwscroll && T.haswrapper),
        this.isrtlmode
          ? this.isvertical
            ? (this.hasreversehr = !(P.iswebkit || P.isie || P.isie11))
            : (this.hasreversehr = !(
                P.iswebkit ||
                (P.isie && !P.isie10 && !P.isie11)
              ))
          : (this.hasreversehr = !1),
        (this.istouchcapable = !1),
        P.cantouch || (!P.hasw3ctouch && !P.hasmstouch)
          ? !P.cantouch ||
            P.isios ||
            P.isandroid ||
            (!P.iswebkit && !P.ismozilla) ||
            (this.istouchcapable = !0)
          : (this.istouchcapable = !0),
        M.enablemouselockapi ||
          ((P.hasmousecapture = !1), (P.haspointerlock = !1)),
        (this.debounced = function (e, o, t) {
          T &&
            (T.delaylist[e] ||
              !1 ||
              ((T.delaylist[e] = {
                h: u(function () {
                  T.delaylist[e].fn.call(T), (T.delaylist[e] = !1);
                }, t),
              }),
              o.call(T)),
            (T.delaylist[e].fn = o));
        }),
        (this.synched = function (e, o) {
          T.synclist[e]
            ? (T.synclist[e] = o)
            : ((T.synclist[e] = o),
              u(function () {
                T &&
                  (T.synclist[e] && T.synclist[e].call(T),
                  (T.synclist[e] = null));
              }));
        }),
        (this.unsynched = function (e) {
          T.synclist[e] && (T.synclist[e] = !1);
        }),
        (this.css = function (e, o) {
          for (var t in o) T.saved.css.push([e, t, e.css(t)]), e.css(t, o[t]);
        }),
        (this.scrollTop = function (e) {
          return void 0 === e ? T.getScrollTop() : T.setScrollTop(e);
        }),
        (this.scrollLeft = function (e) {
          return void 0 === e ? T.getScrollLeft() : T.setScrollLeft(e);
        });
      var R = function (e, o, t, r, i, s, n) {
        (this.st = e),
          (this.ed = o),
          (this.spd = t),
          (this.p1 = r || 0),
          (this.p2 = i || 1),
          (this.p3 = s || 0),
          (this.p4 = n || 1),
          (this.ts = f()),
          (this.df = o - e);
      };
      if (
        ((R.prototype = {
          B2: function (e) {
            return 3 * (1 - e) * (1 - e) * e;
          },
          B3: function (e) {
            return 3 * (1 - e) * e * e;
          },
          B4: function (e) {
            return e * e * e;
          },
          getPos: function () {
            return (f() - this.ts) / this.spd;
          },
          getNow: function () {
            var e = (f() - this.ts) / this.spd,
              o = this.B2(e) + this.B3(e) + this.B4(e);
            return e >= 1 ? this.ed : (this.st + this.df * o) | 0;
          },
          update: function (e, o) {
            return (
              (this.st = this.getNow()),
              (this.ed = e),
              (this.spd = o),
              (this.ts = f()),
              (this.df = this.ed - this.st),
              this
            );
          },
        }),
        this.ishwscroll)
      ) {
        (this.doc.translate = { x: 0, y: 0, tx: '0px', ty: '0px' }),
          P.hastranslate3d &&
            P.isios &&
            this.doc.css('-webkit-backface-visibility', 'hidden'),
          (this.getScrollTop = function (e) {
            if (!e) {
              var o = v();
              if (o) return 16 == o.length ? -o[13] : -o[5];
              if (T.timerscroll && T.timerscroll.bz)
                return T.timerscroll.bz.getNow();
            }
            return T.doc.translate.y;
          }),
          (this.getScrollLeft = function (e) {
            if (!e) {
              var o = v();
              if (o) return 16 == o.length ? -o[12] : -o[4];
              if (T.timerscroll && T.timerscroll.bh)
                return T.timerscroll.bh.getNow();
            }
            return T.doc.translate.x;
          }),
          (this.notifyScrollEvent = function (e) {
            var o = l.createEvent('UIEvents');
            o.initUIEvent('scroll', !1, !1, a, 1),
              (o.niceevent = !0),
              e.dispatchEvent(o);
          });
        var _ = this.isrtlmode ? 1 : -1;
        P.hastranslate3d && M.enabletranslate3d
          ? ((this.setScrollTop = function (e, o) {
              (T.doc.translate.y = e),
                (T.doc.translate.ty = -1 * e + 'px'),
                T.doc.css(
                  P.trstyle,
                  'translate3d(' +
                    T.doc.translate.tx +
                    ',' +
                    T.doc.translate.ty +
                    ',0)'
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }),
            (this.setScrollLeft = function (e, o) {
              (T.doc.translate.x = e),
                (T.doc.translate.tx = e * _ + 'px'),
                T.doc.css(
                  P.trstyle,
                  'translate3d(' +
                    T.doc.translate.tx +
                    ',' +
                    T.doc.translate.ty +
                    ',0)'
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }))
          : ((this.setScrollTop = function (e, o) {
              (T.doc.translate.y = e),
                (T.doc.translate.ty = -1 * e + 'px'),
                T.doc.css(
                  P.trstyle,
                  'translate(' +
                    T.doc.translate.tx +
                    ',' +
                    T.doc.translate.ty +
                    ')'
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }),
            (this.setScrollLeft = function (e, o) {
              (T.doc.translate.x = e),
                (T.doc.translate.tx = e * _ + 'px'),
                T.doc.css(
                  P.trstyle,
                  'translate(' +
                    T.doc.translate.tx +
                    ',' +
                    T.doc.translate.ty +
                    ')'
                ),
                o || T.notifyScrollEvent(T.win[0]);
            }));
      } else
        (this.getScrollTop = function () {
          return T.docscroll.scrollTop();
        }),
          (this.setScrollTop = function (e) {
            T.docscroll.scrollTop(e);
          }),
          (this.getScrollLeft = function () {
            return T.hasreversehr
              ? T.detected.ismozilla
                ? T.page.maxw - Math.abs(T.docscroll.scrollLeft())
                : T.page.maxw - T.docscroll.scrollLeft()
              : T.docscroll.scrollLeft();
          }),
          (this.setScrollLeft = function (e) {
            return setTimeout(function () {
              if (T)
                return (
                  T.hasreversehr &&
                    (e = T.detected.ismozilla
                      ? -(T.page.maxw - e)
                      : T.page.maxw - e),
                  T.docscroll.scrollLeft(e)
                );
            }, 1);
          });
      (this.getTarget = function (e) {
        return !!e && (e.target ? e.target : !!e.srcElement && e.srcElement);
      }),
        (this.hasParent = function (e, o) {
          if (!e) return !1;
          for (var t = e.target || e.srcElement || e || !1; t && t.id != o; )
            t = t.parentNode || !1;
          return !1 !== t;
        });
      var I = { thin: 1, medium: 3, thick: 5 };
      (this.getDocumentScrollOffset = function () {
        return {
          top: a.pageYOffset || l.documentElement.scrollTop,
          left: a.pageXOffset || l.documentElement.scrollLeft,
        };
      }),
        (this.getOffset = function () {
          if (T.isfixed) {
            var e = T.win.offset(),
              o = T.getDocumentScrollOffset();
            return (e.top -= o.top), (e.left -= o.left), e;
          }
          var t = T.win.offset();
          if (!T.viewport) return t;
          var r = T.viewport.offset();
          return { top: t.top - r.top, left: t.left - r.left };
        }),
        (this.updateScrollBar = function (e) {
          var o, t;
          if (T.ishwscroll)
            T.rail.css({
              height:
                T.win.innerHeight() -
                (M.railpadding.top + M.railpadding.bottom),
            }),
              T.railh &&
                T.railh.css({
                  width:
                    T.win.innerWidth() -
                    (M.railpadding.left + M.railpadding.right),
                });
          else {
            var r = T.getOffset();
            if (
              ((o = {
                top: r.top,
                left: r.left - (M.railpadding.left + M.railpadding.right),
              }),
              (o.top += x(T.win, 'border-top-width', !0)),
              (o.left += T.rail.align
                ? T.win.outerWidth() -
                  x(T.win, 'border-right-width') -
                  T.rail.width
                : x(T.win, 'border-left-width')),
              (t = M.railoffset) &&
                (t.top && (o.top += t.top), t.left && (o.left += t.left)),
              T.railslocked ||
                T.rail.css({
                  top: o.top,
                  left: o.left,
                  height:
                    (e ? e.h : T.win.innerHeight()) -
                    (M.railpadding.top + M.railpadding.bottom),
                }),
              T.zoom &&
                T.zoom.css({
                  top: o.top + 1,
                  left:
                    1 == T.rail.align ? o.left - 20 : o.left + T.rail.width + 4,
                }),
              T.railh && !T.railslocked)
            ) {
              (o = { top: r.top, left: r.left }),
                (t = M.railhoffset) &&
                  (t.top && (o.top += t.top), t.left && (o.left += t.left));
              var i = T.railh.align
                  ? o.top +
                    x(T.win, 'border-top-width', !0) +
                    T.win.innerHeight() -
                    T.railh.height
                  : o.top + x(T.win, 'border-top-width', !0),
                s = o.left + x(T.win, 'border-left-width');
              T.railh.css({
                top: i - (M.railpadding.top + M.railpadding.bottom),
                left: s,
                width: T.railh.width,
              });
            }
          }
        }),
        (this.doRailClick = function (e, o, t) {
          var r, i, s, n;
          T.railslocked ||
            (T.cancelEvent(e),
            'pageY' in e ||
              ((e.pageX = e.clientX + l.documentElement.scrollLeft),
              (e.pageY = e.clientY + l.documentElement.scrollTop)),
            o
              ? ((r = t ? T.doScrollLeft : T.doScrollTop),
                (s = t
                  ? (e.pageX - T.railh.offset().left - T.cursorwidth / 2) *
                    T.scrollratio.x
                  : (e.pageY - T.rail.offset().top - T.cursorheight / 2) *
                    T.scrollratio.y),
                T.unsynched('relativexy'),
                r(0 | s))
              : ((r = t ? T.doScrollLeftBy : T.doScrollBy),
                (s = t ? T.scroll.x : T.scroll.y),
                (n = t
                  ? e.pageX - T.railh.offset().left
                  : e.pageY - T.rail.offset().top),
                (i = t ? T.view.w : T.view.h),
                r(s >= n ? i : -i)));
        }),
        (T.newscrolly = T.newscrollx = 0),
        (T.hasanimationframe = 'requestAnimationFrame' in a),
        (T.hascancelanimationframe = 'cancelAnimationFrame' in a),
        (T.hasborderbox = !1),
        (this.init = function () {
          if (((T.saved.css = []), P.isoperamini)) return !0;
          if (P.isandroid && !('hidden' in l)) return !0;
          (M.emulatetouch = M.emulatetouch || M.touchbehavior),
            (T.hasborderbox =
              a.getComputedStyle &&
              'border-box' === a.getComputedStyle(l.body)['box-sizing']);
          var e = { 'overflow-y': 'hidden' };
          if (
            ((P.isie11 || P.isie10) && (e['-ms-overflow-style'] = 'none'),
            T.ishwscroll &&
              (this.doc.css(
                P.transitionstyle,
                P.prefixstyle + 'transform 0ms ease-out'
              ),
              P.transitionend &&
                T.bind(T.doc, P.transitionend, T.onScrollTransitionEnd, !1)),
            (T.zindex = 'auto'),
            T.ispage || 'auto' != M.zindex
              ? (T.zindex = M.zindex)
              : (T.zindex = b() || 'auto'),
            !T.ispage && 'auto' != T.zindex && T.zindex > s && (s = T.zindex),
            T.isie &&
              0 === T.zindex &&
              'auto' == M.zindex &&
              (T.zindex = 'auto'),
            !T.ispage || !P.isieold)
          ) {
            var i = T.docscroll;
            T.ispage && (i = T.haswrapper ? T.win : T.doc),
              T.css(i, e),
              T.ispage && (P.isie11 || P.isie) && T.css(n('html'), e),
              !P.isios ||
                T.ispage ||
                T.haswrapper ||
                T.css(E, { '-webkit-overflow-scrolling': 'touch' });
            var d = n(l.createElement('div'));
            d.css({
              position: 'relative',
              top: 0,
              float: 'right',
              width: M.cursorwidth,
              height: 0,
              'background-color': M.cursorcolor,
              border: M.cursorborder,
              'background-clip': 'padding-box',
              '-webkit-border-radius': M.cursorborderradius,
              '-moz-border-radius': M.cursorborderradius,
              'border-radius': M.cursorborderradius,
            }),
              d.addClass('nicescroll-cursors'),
              (T.cursor = d);
            var u = n(l.createElement('div'));
            u.attr('id', T.id),
              u.addClass('nicescroll-rails nicescroll-rails-vr');
            var h,
              p,
              f = ['left', 'right', 'top', 'bottom'];
            for (var g in f)
              (p = f[g]),
                (h = M.railpadding[p] || 0) && u.css('padding-' + p, h + 'px');
            u.append(d),
              (u.width = Math.max(parseFloat(M.cursorwidth), d.outerWidth())),
              u.css({
                width: u.width + 'px',
                zIndex: T.zindex,
                background: M.background,
                cursor: 'default',
              }),
              (u.visibility = !0),
              (u.scrollable = !0),
              (u.align = 'left' == M.railalign ? 0 : 1),
              (T.rail = u),
              (T.rail.drag = !1);
            var v = !1;
            !M.boxzoom ||
              T.ispage ||
              P.isieold ||
              ((v = l.createElement('div')),
              T.bind(v, 'click', T.doZoom),
              T.bind(v, 'mouseenter', function () {
                T.zoom.css('opacity', M.cursoropacitymax);
              }),
              T.bind(v, 'mouseleave', function () {
                T.zoom.css('opacity', M.cursoropacitymin);
              }),
              (T.zoom = n(v)),
              T.zoom.css({
                cursor: 'pointer',
                zIndex: T.zindex,
                backgroundImage: 'url(' + M.scriptpath + 'zoomico.png)',
                height: 18,
                width: 18,
                backgroundPosition: '0 0',
              }),
              M.dblclickzoom && T.bind(T.win, 'dblclick', T.doZoom),
              P.cantouch &&
                M.gesturezoom &&
                ((T.ongesturezoom = function (e) {
                  return (
                    e.scale > 1.5 && T.doZoomIn(e),
                    e.scale < 0.8 && T.doZoomOut(e),
                    T.cancelEvent(e)
                  );
                }),
                T.bind(T.win, 'gestureend', T.ongesturezoom))),
              (T.railh = !1);
            var w;
            if (
              (M.horizrailenabled &&
                (T.css(i, { overflowX: 'hidden' }),
                (d = n(l.createElement('div'))).css({
                  position: 'absolute',
                  top: 0,
                  height: M.cursorwidth,
                  width: 0,
                  backgroundColor: M.cursorcolor,
                  border: M.cursorborder,
                  backgroundClip: 'padding-box',
                  '-webkit-border-radius': M.cursorborderradius,
                  '-moz-border-radius': M.cursorborderradius,
                  'border-radius': M.cursorborderradius,
                }),
                P.isieold && d.css('overflow', 'hidden'),
                d.addClass('nicescroll-cursors'),
                (T.cursorh = d),
                (w = n(l.createElement('div'))).attr('id', T.id + '-hr'),
                w.addClass('nicescroll-rails nicescroll-rails-hr'),
                (w.height = Math.max(
                  parseFloat(M.cursorwidth),
                  d.outerHeight()
                )),
                w.css({
                  height: w.height + 'px',
                  zIndex: T.zindex,
                  background: M.background,
                }),
                w.append(d),
                (w.visibility = !0),
                (w.scrollable = !0),
                (w.align = 'top' == M.railvalign ? 0 : 1),
                (T.railh = w),
                (T.railh.drag = !1)),
              T.ispage)
            )
              u.css({ position: 'fixed', top: 0, height: '100%' }),
                u.css(u.align ? { right: 0 } : { left: 0 }),
                T.body.append(u),
                T.railh &&
                  (w.css({ position: 'fixed', left: 0, width: '100%' }),
                  w.css(w.align ? { bottom: 0 } : { top: 0 }),
                  T.body.append(w));
            else {
              if (T.ishwscroll) {
                'static' == T.win.css('position') &&
                  T.css(T.win, { position: 'relative' });
                var x = 'HTML' == T.win[0].nodeName ? T.body : T.win;
                n(x).scrollTop(0).scrollLeft(0),
                  T.zoom &&
                    (T.zoom.css({
                      position: 'absolute',
                      top: 1,
                      right: 0,
                      'margin-right': u.width + 4,
                    }),
                    x.append(T.zoom)),
                  u.css({ position: 'absolute', top: 0 }),
                  u.css(u.align ? { right: 0 } : { left: 0 }),
                  x.append(u),
                  w &&
                    (w.css({ position: 'absolute', left: 0, bottom: 0 }),
                    w.css(w.align ? { bottom: 0 } : { top: 0 }),
                    x.append(w));
              } else {
                T.isfixed = 'fixed' == T.win.css('position');
                var S = T.isfixed ? 'fixed' : 'absolute';
                T.isfixed || (T.viewport = T.getViewport(T.win[0])),
                  T.viewport &&
                    ((T.body = T.viewport),
                    /fixed|absolute/.test(T.viewport.css('position')) ||
                      T.css(T.viewport, { position: 'relative' })),
                  u.css({ position: S }),
                  T.zoom && T.zoom.css({ position: S }),
                  T.updateScrollBar(),
                  T.body.append(u),
                  T.zoom && T.body.append(T.zoom),
                  T.railh && (w.css({ position: S }), T.body.append(w));
              }
              P.isios &&
                T.css(T.win, {
                  '-webkit-tap-highlight-color': 'rgba(0,0,0,0)',
                  '-webkit-touch-callout': 'none',
                }),
                M.disableoutline &&
                  (P.isie && T.win.attr('hideFocus', 'true'),
                  P.iswebkit && T.win.css('outline', 'none'));
            }
            if (
              (!1 === M.autohidemode
                ? ((T.autohidedom = !1),
                  T.rail.css({ opacity: M.cursoropacitymax }),
                  T.railh && T.railh.css({ opacity: M.cursoropacitymax }))
                : !0 === M.autohidemode || 'leave' === M.autohidemode
                  ? ((T.autohidedom = n().add(T.rail)),
                    P.isie8 && (T.autohidedom = T.autohidedom.add(T.cursor)),
                    T.railh && (T.autohidedom = T.autohidedom.add(T.railh)),
                    T.railh &&
                      P.isie8 &&
                      (T.autohidedom = T.autohidedom.add(T.cursorh)))
                  : 'scroll' == M.autohidemode
                    ? ((T.autohidedom = n().add(T.rail)),
                      T.railh && (T.autohidedom = T.autohidedom.add(T.railh)))
                    : 'cursor' == M.autohidemode
                      ? ((T.autohidedom = n().add(T.cursor)),
                        T.railh &&
                          (T.autohidedom = T.autohidedom.add(T.cursorh)))
                      : 'hidden' == M.autohidemode &&
                        ((T.autohidedom = !1), T.hide(), (T.railslocked = !1)),
              P.cantouch || T.istouchcapable || M.emulatetouch || P.hasmstouch)
            ) {
              T.scrollmom = new y(T);
              (T.ontouchstart = function (e) {
                if (T.locked) return !1;
                if (
                  e.pointerType &&
                  ('mouse' === e.pointerType ||
                    e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                )
                  return !1;
                if (
                  ((T.hasmoving = !1),
                  T.scrollmom.timer &&
                    (T.triggerScrollEnd(), T.scrollmom.stop()),
                  !T.railslocked)
                ) {
                  var o = T.getTarget(e);
                  if (o && /INPUT/i.test(o.nodeName) && /range/i.test(o.type))
                    return T.stopPropagation(e);
                  var t = 'mousedown' === e.type;
                  if (
                    (!('clientX' in e) &&
                      'changedTouches' in e &&
                      ((e.clientX = e.changedTouches[0].clientX),
                      (e.clientY = e.changedTouches[0].clientY)),
                    T.forcescreen)
                  ) {
                    var r = e;
                    ((e = { original: e.original ? e.original : e }).clientX =
                      r.screenX),
                      (e.clientY = r.screenY);
                  }
                  if (
                    ((T.rail.drag = {
                      x: e.clientX,
                      y: e.clientY,
                      sx: T.scroll.x,
                      sy: T.scroll.y,
                      st: T.getScrollTop(),
                      sl: T.getScrollLeft(),
                      pt: 2,
                      dl: !1,
                      tg: o,
                    }),
                    T.ispage || !M.directionlockdeadzone)
                  )
                    T.rail.drag.dl = 'f';
                  else {
                    var i = { w: c.width(), h: c.height() },
                      s = T.getContentSize(),
                      l = s.h - i.h,
                      a = s.w - i.w;
                    T.rail.scrollable && !T.railh.scrollable
                      ? (T.rail.drag.ck = l > 0 && 'v')
                      : !T.rail.scrollable && T.railh.scrollable
                        ? (T.rail.drag.ck = a > 0 && 'h')
                        : (T.rail.drag.ck = !1);
                  }
                  if (M.emulatetouch && T.isiframe && P.isie) {
                    var d = T.win.position();
                    (T.rail.drag.x += d.left), (T.rail.drag.y += d.top);
                  }
                  if (
                    ((T.hasmoving = !1),
                    (T.lastmouseup = !1),
                    T.scrollmom.reset(e.clientX, e.clientY),
                    o && t)
                  ) {
                    if (!/INPUT|SELECT|BUTTON|TEXTAREA/i.test(o.nodeName))
                      return (
                        P.hasmousecapture && o.setCapture(),
                        M.emulatetouch
                          ? (o.onclick &&
                              !o._onclick &&
                              ((o._onclick = o.onclick),
                              (o.onclick = function (e) {
                                if (T.hasmoving) return !1;
                                o._onclick.call(this, e);
                              })),
                            T.cancelEvent(e))
                          : T.stopPropagation(e)
                      );
                    /SUBMIT|CANCEL|BUTTON/i.test(n(o).attr('type')) &&
                      (T.preventclick = { tg: o, click: !1 });
                  }
                }
              }),
                (T.ontouchend = function (e) {
                  if (!T.rail.drag) return !0;
                  if (2 == T.rail.drag.pt) {
                    if (
                      e.pointerType &&
                      ('mouse' === e.pointerType ||
                        e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                    )
                      return !1;
                    T.rail.drag = !1;
                    var o = 'mouseup' === e.type;
                    if (
                      T.hasmoving &&
                      (T.scrollmom.doMomentum(),
                      (T.lastmouseup = !0),
                      T.hideCursor(),
                      P.hasmousecapture && l.releaseCapture(),
                      o)
                    )
                      return T.cancelEvent(e);
                  } else if (1 == T.rail.drag.pt) return T.onmouseup(e);
                });
              var z = M.emulatetouch && T.isiframe && !P.hasmousecapture,
                k = (0.3 * M.directionlockdeadzone) | 0;
              (T.ontouchmove = function (e, o) {
                if (!T.rail.drag) return !0;
                if (
                  e.targetTouches &&
                  M.preventmultitouchscrolling &&
                  e.targetTouches.length > 1
                )
                  return !0;
                if (
                  e.pointerType &&
                  ('mouse' === e.pointerType ||
                    e.pointerType === e.MSPOINTER_TYPE_MOUSE)
                )
                  return !0;
                if (2 == T.rail.drag.pt) {
                  'changedTouches' in e &&
                    ((e.clientX = e.changedTouches[0].clientX),
                    (e.clientY = e.changedTouches[0].clientY));
                  var t, r;
                  if (((r = t = 0), z && !o)) {
                    var i = T.win.position();
                    (r = -i.left), (t = -i.top);
                  }
                  var s = e.clientY + t,
                    n = s - T.rail.drag.y,
                    a = e.clientX + r,
                    c = a - T.rail.drag.x,
                    d = T.rail.drag.st - n;
                  if (T.ishwscroll && M.bouncescroll)
                    d < 0
                      ? (d = Math.round(d / 2))
                      : d > T.page.maxh &&
                        (d = T.page.maxh + Math.round((d - T.page.maxh) / 2));
                  else if (
                    (d < 0
                      ? ((d = 0), (s = 0))
                      : d > T.page.maxh && ((d = T.page.maxh), (s = 0)),
                    0 === s && !T.hasmoving)
                  )
                    return T.ispage || (T.rail.drag = !1), !0;
                  var u = T.getScrollLeft();
                  if (
                    (T.railh &&
                      T.railh.scrollable &&
                      ((u = T.isrtlmode
                        ? c - T.rail.drag.sl
                        : T.rail.drag.sl - c),
                      T.ishwscroll && M.bouncescroll
                        ? u < 0
                          ? (u = Math.round(u / 2))
                          : u > T.page.maxw &&
                            (u =
                              T.page.maxw + Math.round((u - T.page.maxw) / 2))
                        : (u < 0 && ((u = 0), (a = 0)),
                          u > T.page.maxw && ((u = T.page.maxw), (a = 0)))),
                    !T.hasmoving)
                  ) {
                    if (
                      T.rail.drag.y === e.clientY &&
                      T.rail.drag.x === e.clientX
                    )
                      return T.cancelEvent(e);
                    var h = Math.abs(n),
                      p = Math.abs(c),
                      m = M.directionlockdeadzone;
                    if (
                      (T.rail.drag.ck
                        ? 'v' == T.rail.drag.ck
                          ? p > m && h <= k
                            ? (T.rail.drag = !1)
                            : h > m && (T.rail.drag.dl = 'v')
                          : 'h' == T.rail.drag.ck &&
                            (h > m && p <= k
                              ? (T.rail.drag = !1)
                              : p > m && (T.rail.drag.dl = 'h'))
                        : h > m && p > m
                          ? (T.rail.drag.dl = 'f')
                          : h > m
                            ? (T.rail.drag.dl = p > k ? 'f' : 'v')
                            : p > m && (T.rail.drag.dl = h > k ? 'f' : 'h'),
                      !T.rail.drag.dl)
                    )
                      return T.cancelEvent(e);
                    T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                      (T.hasmoving = !0);
                  }
                  return (
                    T.preventclick &&
                      !T.preventclick.click &&
                      ((T.preventclick.click = T.preventclick.tg.onclick || !1),
                      (T.preventclick.tg.onclick = T.onpreventclick)),
                    T.rail.drag.dl &&
                      ('v' == T.rail.drag.dl
                        ? (u = T.rail.drag.sl)
                        : 'h' == T.rail.drag.dl && (d = T.rail.drag.st)),
                    T.synched('touchmove', function () {
                      T.rail.drag &&
                        2 == T.rail.drag.pt &&
                        (T.prepareTransition && T.resetTransition(),
                        T.rail.scrollable && T.setScrollTop(d),
                        T.scrollmom.update(a, s),
                        T.railh && T.railh.scrollable
                          ? (T.setScrollLeft(u), T.showCursor(d, u))
                          : T.showCursor(d),
                        P.isie10 && l.selection.clear());
                    }),
                    T.cancelEvent(e)
                  );
                }
                return 1 == T.rail.drag.pt ? T.onmousemove(e) : void 0;
              }),
                (T.ontouchstartCursor = function (e, o) {
                  if (!T.rail.drag || 3 == T.rail.drag.pt) {
                    if (T.locked) return T.cancelEvent(e);
                    T.cancelScroll(),
                      (T.rail.drag = {
                        x: e.touches[0].clientX,
                        y: e.touches[0].clientY,
                        sx: T.scroll.x,
                        sy: T.scroll.y,
                        pt: 3,
                        hr: !!o,
                      });
                    var t = T.getTarget(e);
                    return (
                      !T.ispage && P.hasmousecapture && t.setCapture(),
                      T.isiframe &&
                        !P.hasmousecapture &&
                        ((T.saved.csspointerevents =
                          T.doc.css('pointer-events')),
                        T.css(T.doc, { 'pointer-events': 'none' })),
                      T.cancelEvent(e)
                    );
                  }
                }),
                (T.ontouchendCursor = function (e) {
                  if (T.rail.drag) {
                    if (
                      (P.hasmousecapture && l.releaseCapture(),
                      T.isiframe &&
                        !P.hasmousecapture &&
                        T.doc.css('pointer-events', T.saved.csspointerevents),
                      3 != T.rail.drag.pt)
                    )
                      return;
                    return (T.rail.drag = !1), T.cancelEvent(e);
                  }
                }),
                (T.ontouchmoveCursor = function (e) {
                  if (T.rail.drag) {
                    if (3 != T.rail.drag.pt) return;
                    if (((T.cursorfreezed = !0), T.rail.drag.hr)) {
                      (T.scroll.x =
                        T.rail.drag.sx +
                        (e.touches[0].clientX - T.rail.drag.x)),
                        T.scroll.x < 0 && (T.scroll.x = 0);
                      var o = T.scrollvaluemaxw;
                      T.scroll.x > o && (T.scroll.x = o);
                    } else {
                      (T.scroll.y =
                        T.rail.drag.sy +
                        (e.touches[0].clientY - T.rail.drag.y)),
                        T.scroll.y < 0 && (T.scroll.y = 0);
                      var t = T.scrollvaluemax;
                      T.scroll.y > t && (T.scroll.y = t);
                    }
                    return (
                      T.synched('touchmove', function () {
                        T.rail.drag &&
                          3 == T.rail.drag.pt &&
                          (T.showCursor(),
                          T.rail.drag.hr
                            ? T.doScrollLeft(
                                Math.round(T.scroll.x * T.scrollratio.x),
                                M.cursordragspeed
                              )
                            : T.doScrollTop(
                                Math.round(T.scroll.y * T.scrollratio.y),
                                M.cursordragspeed
                              ));
                      }),
                      T.cancelEvent(e)
                    );
                  }
                });
            }
            if (
              ((T.onmousedown = function (e, o) {
                if (!T.rail.drag || 1 == T.rail.drag.pt) {
                  if (T.railslocked) return T.cancelEvent(e);
                  T.cancelScroll(),
                    (T.rail.drag = {
                      x: e.clientX,
                      y: e.clientY,
                      sx: T.scroll.x,
                      sy: T.scroll.y,
                      pt: 1,
                      hr: o || !1,
                    });
                  var t = T.getTarget(e);
                  return (
                    P.hasmousecapture && t.setCapture(),
                    T.isiframe &&
                      !P.hasmousecapture &&
                      ((T.saved.csspointerevents = T.doc.css('pointer-events')),
                      T.css(T.doc, { 'pointer-events': 'none' })),
                    (T.hasmoving = !1),
                    T.cancelEvent(e)
                  );
                }
              }),
              (T.onmouseup = function (e) {
                if (T.rail.drag)
                  return (
                    1 != T.rail.drag.pt ||
                    (P.hasmousecapture && l.releaseCapture(),
                    T.isiframe &&
                      !P.hasmousecapture &&
                      T.doc.css('pointer-events', T.saved.csspointerevents),
                    (T.rail.drag = !1),
                    (T.cursorfreezed = !1),
                    T.hasmoving && T.triggerScrollEnd(),
                    T.cancelEvent(e))
                  );
              }),
              (T.onmousemove = function (e) {
                if (T.rail.drag) {
                  if (1 !== T.rail.drag.pt) return;
                  if (P.ischrome && 0 === e.which) return T.onmouseup(e);
                  if (
                    ((T.cursorfreezed = !0),
                    T.hasmoving ||
                      T.triggerScrollStart(e.clientX, e.clientY, 0, 0, 0),
                    (T.hasmoving = !0),
                    T.rail.drag.hr)
                  ) {
                    (T.scroll.x = T.rail.drag.sx + (e.clientX - T.rail.drag.x)),
                      T.scroll.x < 0 && (T.scroll.x = 0);
                    var o = T.scrollvaluemaxw;
                    T.scroll.x > o && (T.scroll.x = o);
                  } else {
                    (T.scroll.y = T.rail.drag.sy + (e.clientY - T.rail.drag.y)),
                      T.scroll.y < 0 && (T.scroll.y = 0);
                    var t = T.scrollvaluemax;
                    T.scroll.y > t && (T.scroll.y = t);
                  }
                  return (
                    T.synched('mousemove', function () {
                      T.cursorfreezed &&
                        (T.showCursor(),
                        T.rail.drag.hr
                          ? T.scrollLeft(
                              Math.round(T.scroll.x * T.scrollratio.x)
                            )
                          : T.scrollTop(
                              Math.round(T.scroll.y * T.scrollratio.y)
                            ));
                    }),
                    T.cancelEvent(e)
                  );
                }
                T.checkarea = 0;
              }),
              P.cantouch || M.emulatetouch)
            )
              (T.onpreventclick = function (e) {
                if (T.preventclick)
                  return (
                    (T.preventclick.tg.onclick = T.preventclick.click),
                    (T.preventclick = !1),
                    T.cancelEvent(e)
                  );
              }),
                (T.onclick =
                  !P.isios &&
                  function (e) {
                    return (
                      !T.lastmouseup || ((T.lastmouseup = !1), T.cancelEvent(e))
                    );
                  }),
                M.grabcursorenabled &&
                  P.cursorgrabvalue &&
                  (T.css(T.ispage ? T.doc : T.win, {
                    cursor: P.cursorgrabvalue,
                  }),
                  T.css(T.rail, { cursor: P.cursorgrabvalue }));
            else {
              var L = function (e) {
                if (T.selectiondrag) {
                  if (e) {
                    var o = T.win.outerHeight(),
                      t = e.pageY - T.selectiondrag.top;
                    t > 0 && t < o && (t = 0),
                      t >= o && (t -= o),
                      (T.selectiondrag.df = t);
                  }
                  if (0 !== T.selectiondrag.df) {
                    var r = ((-2 * T.selectiondrag.df) / 6) | 0;
                    T.doScrollBy(r),
                      T.debounced(
                        'doselectionscroll',
                        function () {
                          L();
                        },
                        50
                      );
                  }
                }
              };
              (T.hasTextSelected =
                'getSelection' in l
                  ? function () {
                      return l.getSelection().rangeCount > 0;
                    }
                  : 'selection' in l
                    ? function () {
                        return 'None' != l.selection.type;
                      }
                    : function () {
                        return !1;
                      }),
                (T.onselectionstart = function (e) {
                  T.ispage || (T.selectiondrag = T.win.offset());
                }),
                (T.onselectionend = function (e) {
                  T.selectiondrag = !1;
                }),
                (T.onselectiondrag = function (e) {
                  T.selectiondrag &&
                    T.hasTextSelected() &&
                    T.debounced(
                      'selectionscroll',
                      function () {
                        L(e);
                      },
                      250
                    );
                });
            }
            if (
              (P.hasw3ctouch
                ? (T.css(T.ispage ? n('html') : T.win, {
                    'touch-action': 'none',
                  }),
                  T.css(T.rail, { 'touch-action': 'none' }),
                  T.css(T.cursor, { 'touch-action': 'none' }),
                  T.bind(T.win, 'pointerdown', T.ontouchstart),
                  T.bind(l, 'pointerup', T.ontouchend),
                  T.delegate(l, 'pointermove', T.ontouchmove))
                : P.hasmstouch
                  ? (T.css(T.ispage ? n('html') : T.win, {
                      '-ms-touch-action': 'none',
                    }),
                    T.css(T.rail, { '-ms-touch-action': 'none' }),
                    T.css(T.cursor, { '-ms-touch-action': 'none' }),
                    T.bind(T.win, 'MSPointerDown', T.ontouchstart),
                    T.bind(l, 'MSPointerUp', T.ontouchend),
                    T.delegate(l, 'MSPointerMove', T.ontouchmove),
                    T.bind(T.cursor, 'MSGestureHold', function (e) {
                      e.preventDefault();
                    }),
                    T.bind(T.cursor, 'contextmenu', function (e) {
                      e.preventDefault();
                    }))
                  : P.cantouch &&
                    (T.bind(T.win, 'touchstart', T.ontouchstart, !1, !0),
                    T.bind(l, 'touchend', T.ontouchend, !1, !0),
                    T.bind(l, 'touchcancel', T.ontouchend, !1, !0),
                    T.delegate(l, 'touchmove', T.ontouchmove, !1, !0)),
              M.emulatetouch &&
                (T.bind(T.win, 'mousedown', T.ontouchstart, !1, !0),
                T.bind(l, 'mouseup', T.ontouchend, !1, !0),
                T.bind(l, 'mousemove', T.ontouchmove, !1, !0)),
              (M.cursordragontouch || (!P.cantouch && !M.emulatetouch)) &&
                (T.rail.css({ cursor: 'default' }),
                T.railh && T.railh.css({ cursor: 'default' }),
                T.jqbind(T.rail, 'mouseenter', function () {
                  if (!T.ispage && !T.win.is(':visible')) return !1;
                  T.canshowonmouseevent && T.showCursor(), (T.rail.active = !0);
                }),
                T.jqbind(T.rail, 'mouseleave', function () {
                  (T.rail.active = !1), T.rail.drag || T.hideCursor();
                }),
                M.sensitiverail &&
                  (T.bind(T.rail, 'click', function (e) {
                    T.doRailClick(e, !1, !1);
                  }),
                  T.bind(T.rail, 'dblclick', function (e) {
                    T.doRailClick(e, !0, !1);
                  }),
                  T.bind(T.cursor, 'click', function (e) {
                    T.cancelEvent(e);
                  }),
                  T.bind(T.cursor, 'dblclick', function (e) {
                    T.cancelEvent(e);
                  })),
                T.railh &&
                  (T.jqbind(T.railh, 'mouseenter', function () {
                    if (!T.ispage && !T.win.is(':visible')) return !1;
                    T.canshowonmouseevent && T.showCursor(),
                      (T.rail.active = !0);
                  }),
                  T.jqbind(T.railh, 'mouseleave', function () {
                    (T.rail.active = !1), T.rail.drag || T.hideCursor();
                  }),
                  M.sensitiverail &&
                    (T.bind(T.railh, 'click', function (e) {
                      T.doRailClick(e, !1, !0);
                    }),
                    T.bind(T.railh, 'dblclick', function (e) {
                      T.doRailClick(e, !0, !0);
                    }),
                    T.bind(T.cursorh, 'click', function (e) {
                      T.cancelEvent(e);
                    }),
                    T.bind(T.cursorh, 'dblclick', function (e) {
                      T.cancelEvent(e);
                    })))),
              M.cursordragontouch &&
                (this.istouchcapable || P.cantouch) &&
                (T.bind(T.cursor, 'touchstart', T.ontouchstartCursor),
                T.bind(T.cursor, 'touchmove', T.ontouchmoveCursor),
                T.bind(T.cursor, 'touchend', T.ontouchendCursor),
                T.cursorh &&
                  T.bind(T.cursorh, 'touchstart', function (e) {
                    T.ontouchstartCursor(e, !0);
                  }),
                T.cursorh &&
                  T.bind(T.cursorh, 'touchmove', T.ontouchmoveCursor),
                T.cursorh && T.bind(T.cursorh, 'touchend', T.ontouchendCursor)),
              M.emulatetouch || P.isandroid || P.isios
                ? (T.bind(
                    P.hasmousecapture ? T.win : l,
                    'mouseup',
                    T.ontouchend
                  ),
                  T.onclick && T.bind(l, 'click', T.onclick),
                  M.cursordragontouch
                    ? (T.bind(T.cursor, 'mousedown', T.onmousedown),
                      T.bind(T.cursor, 'mouseup', T.onmouseup),
                      T.cursorh &&
                        T.bind(T.cursorh, 'mousedown', function (e) {
                          T.onmousedown(e, !0);
                        }),
                      T.cursorh && T.bind(T.cursorh, 'mouseup', T.onmouseup))
                    : (T.bind(T.rail, 'mousedown', function (e) {
                        e.preventDefault();
                      }),
                      T.railh &&
                        T.bind(T.railh, 'mousedown', function (e) {
                          e.preventDefault();
                        })))
                : (T.bind(
                    P.hasmousecapture ? T.win : l,
                    'mouseup',
                    T.onmouseup
                  ),
                  T.bind(l, 'mousemove', T.onmousemove),
                  T.onclick && T.bind(l, 'click', T.onclick),
                  T.bind(T.cursor, 'mousedown', T.onmousedown),
                  T.bind(T.cursor, 'mouseup', T.onmouseup),
                  T.railh &&
                    (T.bind(T.cursorh, 'mousedown', function (e) {
                      T.onmousedown(e, !0);
                    }),
                    T.bind(T.cursorh, 'mouseup', T.onmouseup)),
                  !T.ispage &&
                    M.enablescrollonselection &&
                    (T.bind(T.win[0], 'mousedown', T.onselectionstart),
                    T.bind(l, 'mouseup', T.onselectionend),
                    T.bind(T.cursor, 'mouseup', T.onselectionend),
                    T.cursorh && T.bind(T.cursorh, 'mouseup', T.onselectionend),
                    T.bind(l, 'mousemove', T.onselectiondrag)),
                  T.zoom &&
                    (T.jqbind(T.zoom, 'mouseenter', function () {
                      T.canshowonmouseevent && T.showCursor(),
                        (T.rail.active = !0);
                    }),
                    T.jqbind(T.zoom, 'mouseleave', function () {
                      (T.rail.active = !1), T.rail.drag || T.hideCursor();
                    }))),
              M.enablemousewheel &&
                (T.isiframe ||
                  T.mousewheel(P.isie && T.ispage ? l : T.win, T.onmousewheel),
                T.mousewheel(T.rail, T.onmousewheel),
                T.railh && T.mousewheel(T.railh, T.onmousewheelhr)),
              T.ispage ||
                P.cantouch ||
                /HTML|^BODY/.test(T.win[0].nodeName) ||
                (T.win.attr('tabindex') || T.win.attr({ tabindex: ++r }),
                T.bind(T.win, 'focus', function (e) {
                  (o = T.getTarget(e).id || T.getTarget(e) || !1),
                    (T.hasfocus = !0),
                    T.canshowonmouseevent && T.noticeCursor();
                }),
                T.bind(T.win, 'blur', function (e) {
                  (o = !1), (T.hasfocus = !1);
                }),
                T.bind(T.win, 'mouseenter', function (e) {
                  (t = T.getTarget(e).id || T.getTarget(e) || !1),
                    (T.hasmousefocus = !0),
                    T.canshowonmouseevent && T.noticeCursor();
                }),
                T.bind(T.win, 'mouseleave', function (e) {
                  (t = !1),
                    (T.hasmousefocus = !1),
                    T.rail.drag || T.hideCursor();
                })),
              (T.onkeypress = function (e) {
                if (T.railslocked && 0 === T.page.maxh) return !0;
                e = e || a.event;
                var r = T.getTarget(e);
                if (
                  r &&
                  /INPUT|TEXTAREA|SELECT|OPTION/.test(r.nodeName) &&
                  (!(r.getAttribute('type') || r.type || !1) ||
                    !/submit|button|cancel/i.tp)
                )
                  return !0;
                if (n(r).attr('contenteditable')) return !0;
                if (
                  T.hasfocus ||
                  (T.hasmousefocus && !o) ||
                  (T.ispage && !o && !t)
                ) {
                  var i = e.keyCode;
                  if (T.railslocked && 27 != i) return T.cancelEvent(e);
                  var s = e.ctrlKey || !1,
                    l = e.shiftKey || !1,
                    c = !1;
                  switch (i) {
                    case 38:
                    case 63233:
                      T.doScrollBy(72), (c = !0);
                      break;
                    case 40:
                    case 63235:
                      T.doScrollBy(-72), (c = !0);
                      break;
                    case 37:
                    case 63232:
                      T.railh &&
                        (s ? T.doScrollLeft(0) : T.doScrollLeftBy(72),
                        (c = !0));
                      break;
                    case 39:
                    case 63234:
                      T.railh &&
                        (s
                          ? T.doScrollLeft(T.page.maxw)
                          : T.doScrollLeftBy(-72),
                        (c = !0));
                      break;
                    case 33:
                    case 63276:
                      T.doScrollBy(T.view.h), (c = !0);
                      break;
                    case 34:
                    case 63277:
                      T.doScrollBy(-T.view.h), (c = !0);
                      break;
                    case 36:
                    case 63273:
                      T.railh && s ? T.doScrollPos(0, 0) : T.doScrollTo(0),
                        (c = !0);
                      break;
                    case 35:
                    case 63275:
                      T.railh && s
                        ? T.doScrollPos(T.page.maxw, T.page.maxh)
                        : T.doScrollTo(T.page.maxh),
                        (c = !0);
                      break;
                    case 32:
                      M.spacebarenabled &&
                        (l ? T.doScrollBy(T.view.h) : T.doScrollBy(-T.view.h),
                        (c = !0));
                      break;
                    case 27:
                      T.zoomactive && (T.doZoom(), (c = !0));
                  }
                  if (c) return T.cancelEvent(e);
                }
              }),
              M.enablekeyboard &&
                T.bind(
                  l,
                  P.isopera && !P.isopera12 ? 'keypress' : 'keydown',
                  T.onkeypress
                ),
              T.bind(l, 'keydown', function (e) {
                (e.ctrlKey || !1) && (T.wheelprevented = !0);
              }),
              T.bind(l, 'keyup', function (e) {
                e.ctrlKey || !1 || (T.wheelprevented = !1);
              }),
              T.bind(a, 'blur', function (e) {
                T.wheelprevented = !1;
              }),
              T.bind(a, 'resize', T.onscreenresize),
              T.bind(a, 'orientationchange', T.onscreenresize),
              T.bind(a, 'load', T.lazyResize),
              P.ischrome && !T.ispage && !T.haswrapper)
            ) {
              var C = T.win.attr('style'),
                N = parseFloat(T.win.css('width')) + 1;
              T.win.css('width', N),
                T.synched('chromefix', function () {
                  T.win.attr('style', C);
                });
            }
            if (
              ((T.onAttributeChange = function (e) {
                T.lazyResize(T.isieold ? 250 : 30);
              }),
              M.enableobserver &&
                (T.isie11 ||
                  !1 === m ||
                  ((T.observerbody = new m(function (e) {
                    if (
                      (e.forEach(function (e) {
                        if ('attributes' == e.type)
                          return E.hasClass('modal-open') &&
                            E.hasClass('modal-dialog') &&
                            !n.contains(n('.modal-dialog')[0], T.doc[0])
                            ? T.hide()
                            : T.show();
                      }),
                      T.me.clientWidth != T.page.width ||
                        T.me.clientHeight != T.page.height)
                    )
                      return T.lazyResize(30);
                  })),
                  T.observerbody.observe(l.body, {
                    childList: !0,
                    subtree: !0,
                    characterData: !1,
                    attributes: !0,
                    attributeFilter: ['class'],
                  })),
                !T.ispage && !T.haswrapper))
            ) {
              var R = T.win[0];
              !1 !== m
                ? ((T.observer = new m(function (e) {
                    e.forEach(T.onAttributeChange);
                  })),
                  T.observer.observe(R, {
                    childList: !0,
                    characterData: !1,
                    attributes: !0,
                    subtree: !1,
                  }),
                  (T.observerremover = new m(function (e) {
                    e.forEach(function (e) {
                      if (e.removedNodes.length > 0)
                        for (var o in e.removedNodes)
                          if (T && e.removedNodes[o] === R) return T.remove();
                    });
                  })),
                  T.observerremover.observe(R.parentNode, {
                    childList: !0,
                    characterData: !1,
                    attributes: !1,
                    subtree: !1,
                  }))
                : (T.bind(
                    R,
                    P.isie && !P.isie9 ? 'propertychange' : 'DOMAttrModified',
                    T.onAttributeChange
                  ),
                  P.isie9 &&
                    R.attachEvent('onpropertychange', T.onAttributeChange),
                  T.bind(R, 'DOMNodeRemoved', function (e) {
                    e.target === R && T.remove();
                  }));
            }
            !T.ispage && M.boxzoom && T.bind(a, 'resize', T.resizeZoom),
              T.istextarea &&
                (T.bind(T.win, 'keydown', T.lazyResize),
                T.bind(T.win, 'mouseup', T.lazyResize)),
              T.lazyResize(30);
          }
          if ('IFRAME' == this.doc[0].nodeName) {
            var _ = function () {
              T.iframexd = !1;
              var o;
              try {
                (o =
                  'contentDocument' in this
                    ? this.contentDocument
                    : this.contentWindow._doc).domain;
              } catch (e) {
                (T.iframexd = !0), (o = !1);
              }
              if (T.iframexd)
                return (
                  'console' in a &&
                    console.log('NiceScroll error: policy restriced iframe'),
                  !0
                );
              if (
                ((T.forcescreen = !0),
                T.isiframe &&
                  ((T.iframe = {
                    doc: n(o),
                    html: T.doc.contents().find('html')[0],
                    body: T.doc.contents().find('body')[0],
                  }),
                  (T.getContentSize = function () {
                    return {
                      w: Math.max(
                        T.iframe.html.scrollWidth,
                        T.iframe.body.scrollWidth
                      ),
                      h: Math.max(
                        T.iframe.html.scrollHeight,
                        T.iframe.body.scrollHeight
                      ),
                    };
                  }),
                  (T.docscroll = n(T.iframe.body))),
                !P.isios && M.iframeautoresize && !T.isiframe)
              ) {
                T.win.scrollTop(0), T.doc.height('');
                var t = Math.max(
                  o.getElementsByTagName('html')[0].scrollHeight,
                  o.body.scrollHeight
                );
                T.doc.height(t);
              }
              T.lazyResize(30),
                T.css(n(T.iframe.body), e),
                P.isios &&
                  T.haswrapper &&
                  T.css(n(o.body), {
                    '-webkit-transform': 'translate3d(0,0,0)',
                  }),
                'contentWindow' in this
                  ? T.bind(this.contentWindow, 'scroll', T.onscroll)
                  : T.bind(o, 'scroll', T.onscroll),
                M.enablemousewheel && T.mousewheel(o, T.onmousewheel),
                M.enablekeyboard &&
                  T.bind(o, P.isopera ? 'keypress' : 'keydown', T.onkeypress),
                P.cantouch
                  ? (T.bind(o, 'touchstart', T.ontouchstart),
                    T.bind(o, 'touchmove', T.ontouchmove))
                  : M.emulatetouch &&
                    (T.bind(o, 'mousedown', T.ontouchstart),
                    T.bind(o, 'mousemove', function (e) {
                      return T.ontouchmove(e, !0);
                    }),
                    M.grabcursorenabled &&
                      P.cursorgrabvalue &&
                      T.css(n(o.body), { cursor: P.cursorgrabvalue })),
                T.bind(o, 'mouseup', T.ontouchend),
                T.zoom &&
                  (M.dblclickzoom && T.bind(o, 'dblclick', T.doZoom),
                  T.ongesturezoom && T.bind(o, 'gestureend', T.ongesturezoom));
            };
            this.doc[0].readyState &&
              'complete' === this.doc[0].readyState &&
              setTimeout(function () {
                _.call(T.doc[0], !1);
              }, 500),
              T.bind(this.doc, 'load', _);
          }
        }),
        (this.showCursor = function (e, o) {
          if (
            (T.cursortimeout &&
              (clearTimeout(T.cursortimeout), (T.cursortimeout = 0)),
            T.rail)
          ) {
            if (
              (T.autohidedom &&
                (T.autohidedom.stop().css({ opacity: M.cursoropacitymax }),
                (T.cursoractive = !0)),
              (T.rail.drag && 1 == T.rail.drag.pt) ||
                (void 0 !== e &&
                  !1 !== e &&
                  (T.scroll.y = (e / T.scrollratio.y) | 0),
                void 0 !== o && (T.scroll.x = (o / T.scrollratio.x) | 0)),
              T.cursor.css({ height: T.cursorheight, top: T.scroll.y }),
              T.cursorh)
            ) {
              var t = T.hasreversehr
                ? T.scrollvaluemaxw - T.scroll.x
                : T.scroll.x;
              T.cursorh.css({
                width: T.cursorwidth,
                left: !T.rail.align && T.rail.visibility ? t + T.rail.width : t,
              }),
                (T.cursoractive = !0);
            }
            T.zoom && T.zoom.stop().css({ opacity: M.cursoropacitymax });
          }
        }),
        (this.hideCursor = function (e) {
          T.cursortimeout ||
            (T.rail &&
              T.autohidedom &&
              ((T.hasmousefocus && 'leave' === M.autohidemode) ||
                (T.cursortimeout = setTimeout(function () {
                  (T.rail.active && T.showonmouseevent) ||
                    (T.autohidedom
                      .stop()
                      .animate({ opacity: M.cursoropacitymin }),
                    T.zoom &&
                      T.zoom.stop().animate({ opacity: M.cursoropacitymin }),
                    (T.cursoractive = !1)),
                    (T.cursortimeout = 0);
                }, e || M.hidecursordelay))));
        }),
        (this.noticeCursor = function (e, o, t) {
          T.showCursor(o, t), T.rail.active || T.hideCursor(e);
        }),
        (this.getContentSize = T.ispage
          ? function () {
              return {
                w: Math.max(l.body.scrollWidth, l.documentElement.scrollWidth),
                h: Math.max(
                  l.body.scrollHeight,
                  l.documentElement.scrollHeight
                ),
              };
            }
          : T.haswrapper
            ? function () {
                return { w: T.doc[0].offsetWidth, h: T.doc[0].offsetHeight };
              }
            : function () {
                return {
                  w: T.docscroll[0].scrollWidth,
                  h: T.docscroll[0].scrollHeight,
                };
              }),
        (this.onResize = function (e, o) {
          if (!T || !T.win) return !1;
          var t = T.page.maxh,
            r = T.page.maxw,
            i = T.view.h,
            s = T.view.w;
          if (
            ((T.view = {
              w: T.ispage ? T.win.width() : T.win[0].clientWidth,
              h: T.ispage ? T.win.height() : T.win[0].clientHeight,
            }),
            (T.page = o || T.getContentSize()),
            (T.page.maxh = Math.max(0, T.page.h - T.view.h)),
            (T.page.maxw = Math.max(0, T.page.w - T.view.w)),
            T.page.maxh == t &&
              T.page.maxw == r &&
              T.view.w == s &&
              T.view.h == i)
          ) {
            if (T.ispage) return T;
            var n = T.win.offset();
            if (T.lastposition) {
              var l = T.lastposition;
              if (l.top == n.top && l.left == n.left) return T;
            }
            T.lastposition = n;
          }
          return (
            0 === T.page.maxh
              ? (T.hideRail(),
                (T.scrollvaluemax = 0),
                (T.scroll.y = 0),
                (T.scrollratio.y = 0),
                (T.cursorheight = 0),
                T.setScrollTop(0),
                T.rail && (T.rail.scrollable = !1))
              : ((T.page.maxh -= M.railpadding.top + M.railpadding.bottom),
                (T.rail.scrollable = !0)),
            0 === T.page.maxw
              ? (T.hideRailHr(),
                (T.scrollvaluemaxw = 0),
                (T.scroll.x = 0),
                (T.scrollratio.x = 0),
                (T.cursorwidth = 0),
                T.setScrollLeft(0),
                T.railh && (T.railh.scrollable = !1))
              : ((T.page.maxw -= M.railpadding.left + M.railpadding.right),
                T.railh && (T.railh.scrollable = M.horizrailenabled)),
            (T.railslocked =
              T.locked || (0 === T.page.maxh && 0 === T.page.maxw)),
            T.railslocked
              ? (T.ispage || T.updateScrollBar(T.view), !1)
              : (T.hidden ||
                  (T.rail.visibility || T.showRail(),
                  T.railh && !T.railh.visibility && T.showRailHr()),
                T.istextarea &&
                  T.win.css('resize') &&
                  'none' != T.win.css('resize') &&
                  (T.view.h -= 20),
                (T.cursorheight = Math.min(
                  T.view.h,
                  Math.round(T.view.h * (T.view.h / T.page.h))
                )),
                (T.cursorheight = M.cursorfixedheight
                  ? M.cursorfixedheight
                  : Math.max(M.cursorminheight, T.cursorheight)),
                (T.cursorwidth = Math.min(
                  T.view.w,
                  Math.round(T.view.w * (T.view.w / T.page.w))
                )),
                (T.cursorwidth = M.cursorfixedheight
                  ? M.cursorfixedheight
                  : Math.max(M.cursorminheight, T.cursorwidth)),
                (T.scrollvaluemax =
                  T.view.h -
                  T.cursorheight -
                  (M.railpadding.top + M.railpadding.bottom)),
                T.hasborderbox ||
                  (T.scrollvaluemax -=
                    T.cursor[0].offsetHeight - T.cursor[0].clientHeight),
                T.railh &&
                  ((T.railh.width =
                    T.page.maxh > 0 ? T.view.w - T.rail.width : T.view.w),
                  (T.scrollvaluemaxw =
                    T.railh.width -
                    T.cursorwidth -
                    (M.railpadding.left + M.railpadding.right))),
                T.ispage || T.updateScrollBar(T.view),
                (T.scrollratio = {
                  x: T.page.maxw / T.scrollvaluemaxw,
                  y: T.page.maxh / T.scrollvaluemax,
                }),
                T.getScrollTop() > T.page.maxh
                  ? T.doScrollTop(T.page.maxh)
                  : ((T.scroll.y = (T.getScrollTop() / T.scrollratio.y) | 0),
                    (T.scroll.x = (T.getScrollLeft() / T.scrollratio.x) | 0),
                    T.cursoractive && T.noticeCursor()),
                T.scroll.y &&
                  0 === T.getScrollTop() &&
                  T.doScrollTo((T.scroll.y * T.scrollratio.y) | 0),
                T)
          );
        }),
        (this.resize = T.onResize);
      var O = 0;
      (this.onscreenresize = function (e) {
        clearTimeout(O);
        var o = !T.ispage && !T.haswrapper;
        o && T.hideRails(),
          (O = setTimeout(function () {
            T && (o && T.showRails(), T.resize()), (O = 0);
          }, 120));
      }),
        (this.lazyResize = function (e) {
          return (
            clearTimeout(O),
            (e = isNaN(e) ? 240 : e),
            (O = setTimeout(function () {
              T && T.resize(), (O = 0);
            }, e)),
            T
          );
        }),
        (this.jqbind = function (e, o, t) {
          T.events.push({ e: e, n: o, f: t, q: !0 }), n(e).on(o, t);
        }),
        (this.mousewheel = function (e, o, t) {
          var r = 'jquery' in e ? e[0] : e;
          if ('onwheel' in l.createElement('div'))
            T._bind(r, 'wheel', o, t || !1);
          else {
            var i = void 0 !== l.onmousewheel ? 'mousewheel' : 'DOMMouseScroll';
            S(r, i, o, t || !1),
              'DOMMouseScroll' == i && S(r, 'MozMousePixelScroll', o, t || !1);
          }
        });
      var Y = !1;
      if (P.haseventlistener) {
        try {
          var H = Object.defineProperty({}, 'passive', {
            get: function () {
              Y = !0;
            },
          });
          a.addEventListener('test', null, H);
        } catch (e) {}
        (this.stopPropagation = function (e) {
          return (
            !!e && ((e = e.original ? e.original : e).stopPropagation(), !1)
          );
        }),
          (this.cancelEvent = function (e) {
            return (
              e.cancelable && e.preventDefault(),
              e.stopImmediatePropagation(),
              e.preventManipulation && e.preventManipulation(),
              !1
            );
          });
      } else
        (Event.prototype.preventDefault = function () {
          this.returnValue = !1;
        }),
          (Event.prototype.stopPropagation = function () {
            this.cancelBubble = !0;
          }),
          (a.constructor.prototype.addEventListener =
            l.constructor.prototype.addEventListener =
            Element.prototype.addEventListener =
              function (e, o, t) {
                this.attachEvent('on' + e, o);
              }),
          (a.constructor.prototype.removeEventListener =
            l.constructor.prototype.removeEventListener =
            Element.prototype.removeEventListener =
              function (e, o, t) {
                this.detachEvent('on' + e, o);
              }),
          (this.cancelEvent = function (e) {
            return (
              (e = e || a.event) &&
                ((e.cancelBubble = !0), (e.cancel = !0), (e.returnValue = !1)),
              !1
            );
          }),
          (this.stopPropagation = function (e) {
            return (e = e || a.event) && (e.cancelBubble = !0), !1;
          });
      (this.delegate = function (e, o, t, r, i) {
        var s = d[o] || !1;
        s ||
          ((s = {
            a: [],
            l: [],
            f: function (e) {
              for (var o = s.l, t = !1, r = o.length - 1; r >= 0; r--)
                if (!1 === (t = o[r].call(e.target, e))) return !1;
              return t;
            },
          }),
          T.bind(e, o, s.f, r, i),
          (d[o] = s)),
          T.ispage
            ? ((s.a = [T.id].concat(s.a)), (s.l = [t].concat(s.l)))
            : (s.a.push(T.id), s.l.push(t));
      }),
        (this.undelegate = function (e, o, t, r, i) {
          var s = d[o] || !1;
          if (s && s.l)
            for (var n = 0, l = s.l.length; n < l; n++)
              s.a[n] === T.id &&
                (s.a.splice(n),
                s.l.splice(n),
                0 === s.a.length && (T._unbind(e, o, s.l.f), (d[o] = null)));
        }),
        (this.bind = function (e, o, t, r, i) {
          var s = 'jquery' in e ? e[0] : e;
          T._bind(s, o, t, r || !1, i || !1);
        }),
        (this._bind = function (e, o, t, r, i) {
          T.events.push({ e: e, n: o, f: t, b: r, q: !1 }),
            Y && i
              ? e.addEventListener(o, t, { passive: !1, capture: r })
              : e.addEventListener(o, t, r || !1);
        }),
        (this._unbind = function (e, o, t, r) {
          d[o] ? T.undelegate(e, o, t, r) : e.removeEventListener(o, t, r);
        }),
        (this.unbindAll = function () {
          for (var e = 0; e < T.events.length; e++) {
            var o = T.events[e];
            o.q ? o.e.unbind(o.n, o.f) : T._unbind(o.e, o.n, o.f, o.b);
          }
        }),
        (this.showRails = function () {
          return T.showRail().showRailHr();
        }),
        (this.showRail = function () {
          return (
            0 === T.page.maxh ||
              (!T.ispage && 'none' == T.win.css('display')) ||
              ((T.rail.visibility = !0), T.rail.css('display', 'block')),
            T
          );
        }),
        (this.showRailHr = function () {
          return (
            T.railh &&
              (0 === T.page.maxw ||
                (!T.ispage && 'none' == T.win.css('display')) ||
                ((T.railh.visibility = !0), T.railh.css('display', 'block'))),
            T
          );
        }),
        (this.hideRails = function () {
          return T.hideRail().hideRailHr();
        }),
        (this.hideRail = function () {
          return (T.rail.visibility = !1), T.rail.css('display', 'none'), T;
        }),
        (this.hideRailHr = function () {
          return (
            T.railh &&
              ((T.railh.visibility = !1), T.railh.css('display', 'none')),
            T
          );
        }),
        (this.show = function () {
          return (T.hidden = !1), (T.railslocked = !1), T.showRails();
        }),
        (this.hide = function () {
          return (T.hidden = !0), (T.railslocked = !0), T.hideRails();
        }),
        (this.toggle = function () {
          return T.hidden ? T.show() : T.hide();
        }),
        (this.remove = function () {
          T.stop(), T.cursortimeout && clearTimeout(T.cursortimeout);
          for (var e in T.delaylist) T.delaylist[e] && h(T.delaylist[e].h);
          T.doZoomOut(),
            T.unbindAll(),
            P.isie9 &&
              T.win[0].detachEvent('onpropertychange', T.onAttributeChange),
            !1 !== T.observer && T.observer.disconnect(),
            !1 !== T.observerremover && T.observerremover.disconnect(),
            !1 !== T.observerbody && T.observerbody.disconnect(),
            (T.events = null),
            T.cursor && T.cursor.remove(),
            T.cursorh && T.cursorh.remove(),
            T.rail && T.rail.remove(),
            T.railh && T.railh.remove(),
            T.zoom && T.zoom.remove();
          for (var o = 0; o < T.saved.css.length; o++) {
            var t = T.saved.css[o];
            t[0].css(t[1], void 0 === t[2] ? '' : t[2]);
          }
          (T.saved = !1), T.me.data('__nicescroll', '');
          var r = n.nicescroll;
          r.each(function (e) {
            if (this && this.id === T.id) {
              delete r[e];
              for (var o = ++e; o < r.length; o++, e++) r[e] = r[o];
              --r.length && delete r[r.length];
            }
          });
          for (var i in T) (T[i] = null), delete T[i];
          T = null;
        }),
        (this.scrollstart = function (e) {
          return (this.onscrollstart = e), T;
        }),
        (this.scrollend = function (e) {
          return (this.onscrollend = e), T;
        }),
        (this.scrollcancel = function (e) {
          return (this.onscrollcancel = e), T;
        }),
        (this.zoomin = function (e) {
          return (this.onzoomin = e), T;
        }),
        (this.zoomout = function (e) {
          return (this.onzoomout = e), T;
        }),
        (this.isScrollable = function (e) {
          var o = e.target ? e.target : e;
          if ('OPTION' == o.nodeName) return !0;
          for (
            ;
            o &&
            1 == o.nodeType &&
            o !== this.me[0] &&
            !/^BODY|HTML/.test(o.nodeName);

          ) {
            var t = n(o),
              r =
                t.css('overflowY') ||
                t.css('overflowX') ||
                t.css('overflow') ||
                '';
            if (/scroll|auto/.test(r)) return o.clientHeight != o.scrollHeight;
            o = !!o.parentNode && o.parentNode;
          }
          return !1;
        }),
        (this.getViewport = function (e) {
          for (
            var o = !(!e || !e.parentNode) && e.parentNode;
            o && 1 == o.nodeType && !/^BODY|HTML/.test(o.nodeName);

          ) {
            var t = n(o);
            if (/fixed|absolute/.test(t.css('position'))) return t;
            var r =
              t.css('overflowY') ||
              t.css('overflowX') ||
              t.css('overflow') ||
              '';
            if (/scroll|auto/.test(r) && o.clientHeight != o.scrollHeight)
              return t;
            if (t.getNiceScroll().length > 0) return t;
            o = !!o.parentNode && o.parentNode;
          }
          return !1;
        }),
        (this.triggerScrollStart = function (e, o, t, r, i) {
          if (T.onscrollstart) {
            var s = {
              type: 'scrollstart',
              current: { x: e, y: o },
              request: { x: t, y: r },
              end: { x: T.newscrollx, y: T.newscrolly },
              speed: i,
            };
            T.onscrollstart.call(T, s);
          }
        }),
        (this.triggerScrollEnd = function () {
          if (T.onscrollend) {
            var e = T.getScrollLeft(),
              o = T.getScrollTop(),
              t = {
                type: 'scrollend',
                current: { x: e, y: o },
                end: { x: e, y: o },
              };
            T.onscrollend.call(T, t);
          }
        });
      var B = 0,
        X = 0,
        D = 0,
        A = 1,
        q = !1;
      if (
        ((this.onmousewheel = function (e) {
          if (T.wheelprevented || T.locked) return !1;
          if (T.railslocked)
            return T.debounced('checkunlock', T.resize, 250), !1;
          if (T.rail.drag) return T.cancelEvent(e);
          if (
            ('auto' === M.oneaxismousemode &&
              0 !== e.deltaX &&
              (M.oneaxismousemode = !1),
            M.oneaxismousemode && 0 === e.deltaX && !T.rail.scrollable)
          )
            return !T.railh || !T.railh.scrollable || T.onmousewheelhr(e);
          var o = f(),
            t = !1;
          if (
            (M.preservenativescrolling &&
              T.checkarea + 600 < o &&
              ((T.nativescrollingarea = T.isScrollable(e)), (t = !0)),
            (T.checkarea = o),
            T.nativescrollingarea)
          )
            return !0;
          var r = k(e, !1, t);
          return r && (T.checkarea = 0), r;
        }),
        (this.onmousewheelhr = function (e) {
          if (!T.wheelprevented) {
            if (T.railslocked || !T.railh.scrollable) return !0;
            if (T.rail.drag) return T.cancelEvent(e);
            var o = f(),
              t = !1;
            return (
              M.preservenativescrolling &&
                T.checkarea + 600 < o &&
                ((T.nativescrollingarea = T.isScrollable(e)), (t = !0)),
              (T.checkarea = o),
              !!T.nativescrollingarea ||
                (T.railslocked ? T.cancelEvent(e) : k(e, !0, t))
            );
          }
        }),
        (this.stop = function () {
          return (
            T.cancelScroll(),
            T.scrollmon && T.scrollmon.stop(),
            (T.cursorfreezed = !1),
            (T.scroll.y = Math.round(T.getScrollTop() * (1 / T.scrollratio.y))),
            T.noticeCursor(),
            T
          );
        }),
        (this.getTransitionSpeed = function (e) {
          return (80 + (e / 72) * M.scrollspeed) | 0;
        }),
        M.smoothscroll)
      )
        if (
          T.ishwscroll &&
          P.hastransition &&
          M.usetransition &&
          M.smoothscroll
        ) {
          var j = '';
          (this.resetTransition = function () {
            (j = ''), T.doc.css(P.prefixstyle + 'transition-duration', '0ms');
          }),
            (this.prepareTransition = function (e, o) {
              var t = o ? e : T.getTransitionSpeed(e),
                r = t + 'ms';
              return (
                j !== r &&
                  ((j = r),
                  T.doc.css(P.prefixstyle + 'transition-duration', r)),
                t
              );
            }),
            (this.doScrollLeft = function (e, o) {
              var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
              T.doScrollPos(e, t, o);
            }),
            (this.doScrollTop = function (e, o) {
              var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
              T.doScrollPos(t, e, o);
            }),
            (this.cursorupdate = {
              running: !1,
              start: function () {
                var e = this;
                if (!e.running) {
                  e.running = !0;
                  var o = function () {
                    e.running && u(o),
                      T.showCursor(T.getScrollTop(), T.getScrollLeft()),
                      T.notifyScrollEvent(T.win[0]);
                  };
                  u(o);
                }
              },
              stop: function () {
                this.running = !1;
              },
            }),
            (this.doScrollPos = function (e, o, t) {
              var r = T.getScrollTop(),
                i = T.getScrollLeft();
              if (
                (((T.newscrolly - r) * (o - r) < 0 ||
                  (T.newscrollx - i) * (e - i) < 0) &&
                  T.cancelScroll(),
                M.bouncescroll
                  ? (o < 0
                      ? (o = (o / 2) | 0)
                      : o > T.page.maxh &&
                        (o = (T.page.maxh + (o - T.page.maxh) / 2) | 0),
                    e < 0
                      ? (e = (e / 2) | 0)
                      : e > T.page.maxw &&
                        (e = (T.page.maxw + (e - T.page.maxw) / 2) | 0))
                  : (o < 0 ? (o = 0) : o > T.page.maxh && (o = T.page.maxh),
                    e < 0 ? (e = 0) : e > T.page.maxw && (e = T.page.maxw)),
                T.scrollrunning && e == T.newscrollx && o == T.newscrolly)
              )
                return !1;
              (T.newscrolly = o), (T.newscrollx = e);
              var s = T.getScrollTop(),
                n = T.getScrollLeft(),
                l = {};
              (l.x = e - n), (l.y = o - s);
              var a = 0 | Math.sqrt(l.x * l.x + l.y * l.y),
                c = T.prepareTransition(a);
              T.scrollrunning ||
                ((T.scrollrunning = !0),
                T.triggerScrollStart(n, s, e, o, c),
                T.cursorupdate.start()),
                (T.scrollendtrapped = !0),
                P.transitionend ||
                  (T.scrollendtrapped && clearTimeout(T.scrollendtrapped),
                  (T.scrollendtrapped = setTimeout(
                    T.onScrollTransitionEnd,
                    c
                  ))),
                T.setScrollTop(T.newscrolly),
                T.setScrollLeft(T.newscrollx);
            }),
            (this.cancelScroll = function () {
              if (!T.scrollendtrapped) return !0;
              var e = T.getScrollTop(),
                o = T.getScrollLeft();
              return (
                (T.scrollrunning = !1),
                P.transitionend || clearTimeout(P.transitionend),
                (T.scrollendtrapped = !1),
                T.resetTransition(),
                T.setScrollTop(e),
                T.railh && T.setScrollLeft(o),
                T.timerscroll &&
                  T.timerscroll.tm &&
                  clearInterval(T.timerscroll.tm),
                (T.timerscroll = !1),
                (T.cursorfreezed = !1),
                T.cursorupdate.stop(),
                T.showCursor(e, o),
                T
              );
            }),
            (this.onScrollTransitionEnd = function () {
              if (T.scrollendtrapped) {
                var e = T.getScrollTop(),
                  o = T.getScrollLeft();
                if (
                  (e < 0 ? (e = 0) : e > T.page.maxh && (e = T.page.maxh),
                  o < 0 ? (o = 0) : o > T.page.maxw && (o = T.page.maxw),
                  e != T.newscrolly || o != T.newscrollx)
                )
                  return T.doScrollPos(o, e, M.snapbackspeed);
                T.scrollrunning && T.triggerScrollEnd(),
                  (T.scrollrunning = !1),
                  (T.scrollendtrapped = !1),
                  T.resetTransition(),
                  (T.timerscroll = !1),
                  T.setScrollTop(e),
                  T.railh && T.setScrollLeft(o),
                  T.cursorupdate.stop(),
                  T.noticeCursor(!1, e, o),
                  (T.cursorfreezed = !1);
              }
            });
        } else
          (this.doScrollLeft = function (e, o) {
            var t = T.scrollrunning ? T.newscrolly : T.getScrollTop();
            T.doScrollPos(e, t, o);
          }),
            (this.doScrollTop = function (e, o) {
              var t = T.scrollrunning ? T.newscrollx : T.getScrollLeft();
              T.doScrollPos(t, e, o);
            }),
            (this.doScrollPos = function (e, o, t) {
              var r = T.getScrollTop(),
                i = T.getScrollLeft();
              ((T.newscrolly - r) * (o - r) < 0 ||
                (T.newscrollx - i) * (e - i) < 0) &&
                T.cancelScroll();
              var s = !1;
              if (
                ((T.bouncescroll && T.rail.visibility) ||
                  (o < 0
                    ? ((o = 0), (s = !0))
                    : o > T.page.maxh && ((o = T.page.maxh), (s = !0))),
                (T.bouncescroll && T.railh.visibility) ||
                  (e < 0
                    ? ((e = 0), (s = !0))
                    : e > T.page.maxw && ((e = T.page.maxw), (s = !0))),
                T.scrollrunning && T.newscrolly === o && T.newscrollx === e)
              )
                return !0;
              (T.newscrolly = o),
                (T.newscrollx = e),
                (T.dst = {}),
                (T.dst.x = e - i),
                (T.dst.y = o - r),
                (T.dst.px = i),
                (T.dst.py = r);
              var n = 0 | Math.sqrt(T.dst.x * T.dst.x + T.dst.y * T.dst.y),
                l = T.getTransitionSpeed(n);
              T.bzscroll = {};
              var a = s ? 1 : 0.58;
              (T.bzscroll.x = new R(i, T.newscrollx, l, 0, 0, a, 1)),
                (T.bzscroll.y = new R(r, T.newscrolly, l, 0, 0, a, 1));
              f();
              var c = function () {
                if (T.scrollrunning) {
                  var e = T.bzscroll.y.getPos();
                  T.setScrollLeft(T.bzscroll.x.getNow()),
                    T.setScrollTop(T.bzscroll.y.getNow()),
                    e <= 1
                      ? (T.timer = u(c))
                      : ((T.scrollrunning = !1),
                        (T.timer = 0),
                        T.triggerScrollEnd());
                }
              };
              T.scrollrunning ||
                (T.triggerScrollStart(i, r, e, o, l),
                (T.scrollrunning = !0),
                (T.timer = u(c)));
            }),
            (this.cancelScroll = function () {
              return (
                T.timer && h(T.timer),
                (T.timer = 0),
                (T.bzscroll = !1),
                (T.scrollrunning = !1),
                T
              );
            });
      else
        (this.doScrollLeft = function (e, o) {
          var t = T.getScrollTop();
          T.doScrollPos(e, t, o);
        }),
          (this.doScrollTop = function (e, o) {
            var t = T.getScrollLeft();
            T.doScrollPos(t, e, o);
          }),
          (this.doScrollPos = function (e, o, t) {
            var r = e > T.page.maxw ? T.page.maxw : e;
            r < 0 && (r = 0);
            var i = o > T.page.maxh ? T.page.maxh : o;
            i < 0 && (i = 0),
              T.synched('scroll', function () {
                T.setScrollTop(i), T.setScrollLeft(r);
              });
          }),
          (this.cancelScroll = function () {});
      (this.doScrollBy = function (e, o) {
        z(0, e);
      }),
        (this.doScrollLeftBy = function (e, o) {
          z(e, 0);
        }),
        (this.doScrollTo = function (e, o) {
          var t = o ? Math.round(e * T.scrollratio.y) : e;
          t < 0 ? (t = 0) : t > T.page.maxh && (t = T.page.maxh),
            (T.cursorfreezed = !1),
            T.doScrollTop(e);
        }),
        (this.checkContentSize = function () {
          var e = T.getContentSize();
          (e.h == T.page.h && e.w == T.page.w) || T.resize(!1, e);
        }),
        (T.onscroll = function (e) {
          T.rail.drag ||
            T.cursorfreezed ||
            T.synched('scroll', function () {
              (T.scroll.y = Math.round(T.getScrollTop() / T.scrollratio.y)),
                T.railh &&
                  (T.scroll.x = Math.round(
                    T.getScrollLeft() / T.scrollratio.x
                  )),
                T.noticeCursor();
            });
        }),
        T.bind(T.docscroll, 'scroll', T.onscroll),
        (this.doZoomIn = function (e) {
          if (!T.zoomactive) {
            (T.zoomactive = !0), (T.zoomrestore = { style: {} });
            var o = [
                'position',
                'top',
                'left',
                'zIndex',
                'backgroundColor',
                'marginTop',
                'marginBottom',
                'marginLeft',
                'marginRight',
              ],
              t = T.win[0].style;
            for (var r in o) {
              var i = o[r];
              T.zoomrestore.style[i] = void 0 !== t[i] ? t[i] : '';
            }
            (T.zoomrestore.style.width = T.win.css('width')),
              (T.zoomrestore.style.height = T.win.css('height')),
              (T.zoomrestore.padding = {
                w: T.win.outerWidth() - T.win.width(),
                h: T.win.outerHeight() - T.win.height(),
              }),
              P.isios4 &&
                ((T.zoomrestore.scrollTop = c.scrollTop()), c.scrollTop(0)),
              T.win.css({
                position: P.isios4 ? 'absolute' : 'fixed',
                top: 0,
                left: 0,
                zIndex: s + 100,
                margin: 0,
              });
            var n = T.win.css('backgroundColor');
            return (
              ('' === n ||
                /transparent|rgba\(0, 0, 0, 0\)|rgba\(0,0,0,0\)/.test(n)) &&
                T.win.css('backgroundColor', '#fff'),
              T.rail.css({ zIndex: s + 101 }),
              T.zoom.css({ zIndex: s + 102 }),
              T.zoom.css('backgroundPosition', '0 -18px'),
              T.resizeZoom(),
              T.onzoomin && T.onzoomin.call(T),
              T.cancelEvent(e)
            );
          }
        }),
        (this.doZoomOut = function (e) {
          if (T.zoomactive)
            return (
              (T.zoomactive = !1),
              T.win.css('margin', ''),
              T.win.css(T.zoomrestore.style),
              P.isios4 && c.scrollTop(T.zoomrestore.scrollTop),
              T.rail.css({ 'z-index': T.zindex }),
              T.zoom.css({ 'z-index': T.zindex }),
              (T.zoomrestore = !1),
              T.zoom.css('backgroundPosition', '0 0'),
              T.onResize(),
              T.onzoomout && T.onzoomout.call(T),
              T.cancelEvent(e)
            );
        }),
        (this.doZoom = function (e) {
          return T.zoomactive ? T.doZoomOut(e) : T.doZoomIn(e);
        }),
        (this.resizeZoom = function () {
          if (T.zoomactive) {
            var e = T.getScrollTop();
            T.win.css({
              width: c.width() - T.zoomrestore.padding.w + 'px',
              height: c.height() - T.zoomrestore.padding.h + 'px',
            }),
              T.onResize(),
              T.setScrollTop(Math.min(T.page.maxh, e));
          }
        }),
        this.init(),
        n.nicescroll.push(this);
    },
    y = function (e) {
      var o = this;
      (this.nc = e),
        (this.lastx = 0),
        (this.lasty = 0),
        (this.speedx = 0),
        (this.speedy = 0),
        (this.lasttime = 0),
        (this.steptime = 0),
        (this.snapx = !1),
        (this.snapy = !1),
        (this.demulx = 0),
        (this.demuly = 0),
        (this.lastscrollx = -1),
        (this.lastscrolly = -1),
        (this.chkx = 0),
        (this.chky = 0),
        (this.timer = 0),
        (this.reset = function (e, t) {
          o.stop(),
            (o.steptime = 0),
            (o.lasttime = f()),
            (o.speedx = 0),
            (o.speedy = 0),
            (o.lastx = e),
            (o.lasty = t),
            (o.lastscrollx = -1),
            (o.lastscrolly = -1);
        }),
        (this.update = function (e, t) {
          var r = f();
          (o.steptime = r - o.lasttime), (o.lasttime = r);
          var i = t - o.lasty,
            s = e - o.lastx,
            n = o.nc.getScrollTop() + i,
            l = o.nc.getScrollLeft() + s;
          (o.snapx = l < 0 || l > o.nc.page.maxw),
            (o.snapy = n < 0 || n > o.nc.page.maxh),
            (o.speedx = s),
            (o.speedy = i),
            (o.lastx = e),
            (o.lasty = t);
        }),
        (this.stop = function () {
          o.nc.unsynched('domomentum2d'),
            o.timer && clearTimeout(o.timer),
            (o.timer = 0),
            (o.lastscrollx = -1),
            (o.lastscrolly = -1);
        }),
        (this.doSnapy = function (e, t) {
          var r = !1;
          t < 0
            ? ((t = 0), (r = !0))
            : t > o.nc.page.maxh && ((t = o.nc.page.maxh), (r = !0)),
            e < 0
              ? ((e = 0), (r = !0))
              : e > o.nc.page.maxw && ((e = o.nc.page.maxw), (r = !0)),
            r
              ? o.nc.doScrollPos(e, t, o.nc.opt.snapbackspeed)
              : o.nc.triggerScrollEnd();
        }),
        (this.doMomentum = function (e) {
          var t = f(),
            r = e ? t + e : o.lasttime,
            i = o.nc.getScrollLeft(),
            s = o.nc.getScrollTop(),
            n = o.nc.page.maxh,
            l = o.nc.page.maxw;
          (o.speedx = l > 0 ? Math.min(60, o.speedx) : 0),
            (o.speedy = n > 0 ? Math.min(60, o.speedy) : 0);
          var a = r && t - r <= 60;
          (s < 0 || s > n || i < 0 || i > l) && (a = !1);
          var c = !(!o.speedy || !a) && o.speedy,
            d = !(!o.speedx || !a) && o.speedx;
          if (c || d) {
            var u = Math.max(16, o.steptime);
            if (u > 50) {
              var h = u / 50;
              (o.speedx *= h), (o.speedy *= h), (u = 50);
            }
            (o.demulxy = 0),
              (o.lastscrollx = o.nc.getScrollLeft()),
              (o.chkx = o.lastscrollx),
              (o.lastscrolly = o.nc.getScrollTop()),
              (o.chky = o.lastscrolly);
            var p = o.lastscrollx,
              m = o.lastscrolly,
              g = function () {
                var e = f() - t > 600 ? 0.04 : 0.02;
                o.speedx &&
                  ((p = Math.floor(o.lastscrollx - o.speedx * (1 - o.demulxy))),
                  (o.lastscrollx = p),
                  (p < 0 || p > l) && (e = 0.1)),
                  o.speedy &&
                    ((m = Math.floor(
                      o.lastscrolly - o.speedy * (1 - o.demulxy)
                    )),
                    (o.lastscrolly = m),
                    (m < 0 || m > n) && (e = 0.1)),
                  (o.demulxy = Math.min(1, o.demulxy + e)),
                  o.nc.synched('domomentum2d', function () {
                    if (o.speedx) {
                      o.nc.getScrollLeft();
                      (o.chkx = p), o.nc.setScrollLeft(p);
                    }
                    if (o.speedy) {
                      o.nc.getScrollTop();
                      (o.chky = m), o.nc.setScrollTop(m);
                    }
                    o.timer || (o.nc.hideCursor(), o.doSnapy(p, m));
                  }),
                  o.demulxy < 1
                    ? (o.timer = setTimeout(g, u))
                    : (o.stop(), o.nc.hideCursor(), o.doSnapy(p, m));
              };
            g();
          } else o.doSnapy(o.nc.getScrollLeft(), o.nc.getScrollTop());
        });
    },
    x = e.fn.scrollTop;
  (e.cssHooks.pageYOffset = {
    get: function (e, o, t) {
      var r = n.data(e, '__nicescroll') || !1;
      return r && r.ishwscroll ? r.getScrollTop() : x.call(e);
    },
    set: function (e, o) {
      var t = n.data(e, '__nicescroll') || !1;
      return (
        t && t.ishwscroll ? t.setScrollTop(parseInt(o)) : x.call(e, o), this
      );
    },
  }),
    (e.fn.scrollTop = function (e) {
      if (void 0 === e) {
        var o = !!this[0] && (n.data(this[0], '__nicescroll') || !1);
        return o && o.ishwscroll ? o.getScrollTop() : x.call(this);
      }
      return this.each(function () {
        var o = n.data(this, '__nicescroll') || !1;
        o && o.ishwscroll ? o.setScrollTop(parseInt(e)) : x.call(n(this), e);
      });
    });
  var S = e.fn.scrollLeft;
  (n.cssHooks.pageXOffset = {
    get: function (e, o, t) {
      var r = n.data(e, '__nicescroll') || !1;
      return r && r.ishwscroll ? r.getScrollLeft() : S.call(e);
    },
    set: function (e, o) {
      var t = n.data(e, '__nicescroll') || !1;
      return (
        t && t.ishwscroll ? t.setScrollLeft(parseInt(o)) : S.call(e, o), this
      );
    },
  }),
    (e.fn.scrollLeft = function (e) {
      if (void 0 === e) {
        var o = !!this[0] && (n.data(this[0], '__nicescroll') || !1);
        return o && o.ishwscroll ? o.getScrollLeft() : S.call(this);
      }
      return this.each(function () {
        var o = n.data(this, '__nicescroll') || !1;
        o && o.ishwscroll ? o.setScrollLeft(parseInt(e)) : S.call(n(this), e);
      });
    });
  var z = function (e) {
    var o = this;
    if (
      ((this.length = 0),
      (this.name = 'nicescrollarray'),
      (this.each = function (e) {
        return n.each(o, e), o;
      }),
      (this.push = function (e) {
        (o[o.length] = e), o.length++;
      }),
      (this.eq = function (e) {
        return o[e];
      }),
      e)
    )
      for (var t = 0; t < e.length; t++) {
        var r = n.data(e[t], '__nicescroll') || !1;
        r && ((this[this.length] = r), this.length++);
      }
    return this;
  };
  !(function (e, o, t) {
    for (var r = 0, i = o.length; r < i; r++) t(e, o[r]);
  })(
    z.prototype,
    [
      'show',
      'hide',
      'toggle',
      'onResize',
      'resize',
      'remove',
      'stop',
      'doScrollPos',
    ],
    function (e, o) {
      e[o] = function () {
        var e = arguments;
        return this.each(function () {
          this[o].apply(this, e);
        });
      };
    }
  ),
    (e.fn.getNiceScroll = function (e) {
      return void 0 === e
        ? new z(this)
        : (this[e] && n.data(this[e], '__nicescroll')) || !1;
    }),
    ((e.expr.pseudos || e.expr[':']).nicescroll = function (e) {
      return void 0 !== n.data(e, '__nicescroll');
    }),
    (n.fn.niceScroll = function (e, o) {
      void 0 !== o ||
        'object' != typeof e ||
        'jquery' in e ||
        ((o = e), (e = !1));
      var t = new z();
      return (
        this.each(function () {
          var r = n(this),
            i = n.extend({}, o);
          if (e) {
            var s = n(e);
            (i.doc = s.length > 1 ? n(e, r) : s), (i.win = r);
          }
          !('doc' in i) || 'win' in i || (i.win = r);
          var l = r.data('__nicescroll') || !1;
          l ||
            ((i.doc = i.doc || r),
            (l = new b(i, r)),
            r.data('__nicescroll', l)),
            t.push(l);
        }),
        1 === t.length ? t[0] : t
      );
    }),
    (a.NiceScroll = {
      getjQuery: function () {
        return e;
      },
    }),
    n.nicescroll || ((n.nicescroll = new z()), (n.nicescroll.options = g));
});

/*!

 Holder - client side image placeholders
 Version 2.9.0+f2dkw
 © 2015 Ivan Malopinsky - http://imsky.co

 Site:     http://holderjs.com
 Issues:   https://github.com/imsky/holder/issues
 License:  MIT

 */
!(function (e) {
  if (e.document) {
    var t = e.document;
    t.querySelectorAll ||
      (t.querySelectorAll = function (n) {
        var r,
          i = t.createElement('style'),
          o = [];
        for (
          t.documentElement.firstChild.appendChild(i),
            t._qsa = [],
            i.styleSheet.cssText =
              n +
              '{x-qsa:expression(document._qsa && document._qsa.push(this))}',
            e.scrollBy(0, 0),
            i.parentNode.removeChild(i);
          t._qsa.length;

        )
          (r = t._qsa.shift()), r.style.removeAttribute('x-qsa'), o.push(r);
        return (t._qsa = null), o;
      }),
      t.querySelector ||
        (t.querySelector = function (e) {
          var n = t.querySelectorAll(e);
          return n.length ? n[0] : null;
        }),
      t.getElementsByClassName ||
        (t.getElementsByClassName = function (e) {
          return (e = String(e).replace(/^|\s+/g, '.')), t.querySelectorAll(e);
        }),
      Object.keys ||
        (Object.keys = function (e) {
          if (e !== Object(e))
            throw TypeError('Object.keys called on non-object');
          var t,
            n = [];
          for (t in e) Object.prototype.hasOwnProperty.call(e, t) && n.push(t);
          return n;
        }),
      Array.prototype.forEach ||
        (Array.prototype.forEach = function (e) {
          if (void 0 === this || null === this) throw TypeError();
          var t = Object(this),
            n = t.length >>> 0;
          if ('function' != typeof e) throw TypeError();
          var r,
            i = arguments[1];
          for (r = 0; n > r; r++) r in t && e.call(i, t[r], r, t);
        }),
      (function (e) {
        var t =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        (e.atob =
          e.atob ||
          function (e) {
            e = String(e);
            var n,
              r = 0,
              i = [],
              o = 0,
              a = 0;
            if (
              ((e = e.replace(/\s/g, '')),
              e.length % 4 === 0 && (e = e.replace(/=+$/, '')),
              e.length % 4 === 1)
            )
              throw Error('InvalidCharacterError');
            if (/[^+/0-9A-Za-z]/.test(e)) throw Error('InvalidCharacterError');
            for (; r < e.length; )
              (n = t.indexOf(e.charAt(r))),
                (o = (o << 6) | n),
                (a += 6),
                24 === a &&
                  (i.push(String.fromCharCode((o >> 16) & 255)),
                  i.push(String.fromCharCode((o >> 8) & 255)),
                  i.push(String.fromCharCode(255 & o)),
                  (a = 0),
                  (o = 0)),
                (r += 1);
            return (
              12 === a
                ? ((o >>= 4), i.push(String.fromCharCode(255 & o)))
                : 18 === a &&
                  ((o >>= 2),
                  i.push(String.fromCharCode((o >> 8) & 255)),
                  i.push(String.fromCharCode(255 & o))),
              i.join('')
            );
          }),
          (e.btoa =
            e.btoa ||
            function (e) {
              e = String(e);
              var n,
                r,
                i,
                o,
                a,
                s,
                l,
                h = 0,
                u = [];
              if (/[^\x00-\xFF]/.test(e)) throw Error('InvalidCharacterError');
              for (; h < e.length; )
                (n = e.charCodeAt(h++)),
                  (r = e.charCodeAt(h++)),
                  (i = e.charCodeAt(h++)),
                  (o = n >> 2),
                  (a = ((3 & n) << 4) | (r >> 4)),
                  (s = ((15 & r) << 2) | (i >> 6)),
                  (l = 63 & i),
                  h === e.length + 2
                    ? ((s = 64), (l = 64))
                    : h === e.length + 1 && (l = 64),
                  u.push(t.charAt(o), t.charAt(a), t.charAt(s), t.charAt(l));
              return u.join('');
            });
      })(e),
      Object.prototype.hasOwnProperty ||
        (Object.prototype.hasOwnProperty = function (e) {
          var t = this.__proto__ || this.constructor.prototype;
          return e in this && (!(e in t) || t[e] !== this[e]);
        }),
      (function () {
        if (
          ('performance' in e == !1 && (e.performance = {}),
          (Date.now =
            Date.now ||
            function () {
              return new Date().getTime();
            }),
          'now' in e.performance == !1)
        ) {
          var t = Date.now();
          performance.timing &&
            performance.timing.navigationStart &&
            (t = performance.timing.navigationStart),
            (e.performance.now = function () {
              return Date.now() - t;
            });
        }
      })(),
      e.requestAnimationFrame ||
        (e.webkitRequestAnimationFrame
          ? !(function (e) {
              (e.requestAnimationFrame = function (t) {
                return webkitRequestAnimationFrame(function () {
                  t(e.performance.now());
                });
              }),
                (e.cancelAnimationFrame = webkitCancelAnimationFrame);
            })(e)
          : e.mozRequestAnimationFrame
            ? !(function (e) {
                (e.requestAnimationFrame = function (t) {
                  return mozRequestAnimationFrame(function () {
                    t(e.performance.now());
                  });
                }),
                  (e.cancelAnimationFrame = mozCancelAnimationFrame);
              })(e)
            : !(function (e) {
                (e.requestAnimationFrame = function (t) {
                  return e.setTimeout(t, 1e3 / 60);
                }),
                  (e.cancelAnimationFrame = e.clearTimeout);
              })(e));
  }
})(this),
  (function (e, t) {
    'object' == typeof exports && 'object' == typeof module
      ? (module.exports = t())
      : 'function' == typeof define && define.amd
        ? define([], t)
        : 'object' == typeof exports
          ? (exports.Holder = t())
          : (e.Holder = t());
  })(this, function () {
    return (function (e) {
      function t(r) {
        if (n[r]) return n[r].exports;
        var i = (n[r] = { exports: {}, id: r, loaded: !1 });
        return (
          e[r].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports
        );
      }
      var n = {};
      return (t.m = e), (t.c = n), (t.p = ''), t(0);
    })([
      function (e, t, n) {
        e.exports = n(1);
      },
      function (e, t, n) {
        (function (t) {
          function r(e, t, n, r) {
            var a = i(n.substr(n.lastIndexOf(e.domain)), e);
            a && o({ mode: null, el: r, flags: a, engineSettings: t });
          }
          function i(e, t) {
            var n = {
                theme: T(F.settings.themes.gray, null),
                stylesheets: t.stylesheets,
                instanceOptions: t,
              },
              r = e.split('?'),
              i = r[0].split('/');
            n.holderURL = e;
            var o = i[1],
              a = o.match(/([\d]+p?)x([\d]+p?)/);
            if (!a) return !1;
            if (
              ((n.fluid = -1 !== o.indexOf('p')),
              (n.dimensions = {
                width: a[1].replace('p', '%'),
                height: a[2].replace('p', '%'),
              }),
              2 === r.length)
            ) {
              var s = v.parse(r[1]);
              if (
                (s.bg && (n.theme.bg = w.parseColor(s.bg)),
                s.fg && (n.theme.fg = w.parseColor(s.fg)),
                s.bg && !s.fg && (n.autoFg = !0),
                s.theme &&
                  n.instanceOptions.themes.hasOwnProperty(s.theme) &&
                  (n.theme = T(n.instanceOptions.themes[s.theme], null)),
                s.text && (n.text = s.text),
                s.textmode && (n.textmode = s.textmode),
                s.size && (n.size = s.size),
                s.font && (n.font = s.font),
                s.align && (n.align = s.align),
                s.lineWrap && (n.lineWrap = s.lineWrap),
                (n.nowrap = w.truthy(s.nowrap)),
                (n.auto = w.truthy(s.auto)),
                (n.outline = w.truthy(s.outline)),
                w.truthy(s.random))
              ) {
                F.vars.cache.themeKeys =
                  F.vars.cache.themeKeys ||
                  Object.keys(n.instanceOptions.themes);
                var l =
                  F.vars.cache.themeKeys[
                    0 | (Math.random() * F.vars.cache.themeKeys.length)
                  ];
                n.theme = T(n.instanceOptions.themes[l], null);
              }
            }
            return n;
          }
          function o(e) {
            var t = e.mode,
              n = e.el,
              r = e.flags,
              i = e.engineSettings,
              o = r.dimensions,
              s = r.theme,
              l = o.width + 'x' + o.height;
            t = null == t ? (r.fluid ? 'fluid' : 'image') : t;
            var d = /holder_([a-z]+)/g,
              c = !1;
            if (
              null != r.text &&
              ((s.text = r.text), 'object' === n.nodeName.toLowerCase())
            ) {
              for (var f = s.text.split('\\n'), p = 0; p < f.length; p++)
                f[p] = w.encodeHtmlEntity(f[p]);
              s.text = f.join('\\n');
            }
            if (s.text) {
              var g = s.text.match(d);
              null !== g &&
                g.forEach(function (e) {
                  'holder_dimensions' === e && (s.text = s.text.replace(e, l));
                });
            }
            var m = r.holderURL,
              v = T(i, null);
            if (
              (r.font &&
                ((s.font = r.font),
                !v.noFontFallback &&
                  'img' === n.nodeName.toLowerCase() &&
                  F.setup.supportsCanvas &&
                  'svg' === v.renderer &&
                  (v = T(v, { renderer: 'canvas' }))),
              r.font && 'canvas' == v.renderer && (v.reRender = !0),
              'background' == t)
            )
              null == n.getAttribute('data-background-src') &&
                x.setAttr(n, { 'data-background-src': m });
            else {
              var y = {};
              (y[F.vars.dataAttr] = m), x.setAttr(n, y);
            }
            (r.theme = s),
              (n.holderData = { flags: r, engineSettings: v }),
              ('image' == t || 'fluid' == t) &&
                x.setAttr(n, {
                  alt: s.text ? (c ? s.text : s.text + ' [' + l + ']') : l,
                });
            var b = {
              mode: t,
              el: n,
              holderSettings: { dimensions: o, theme: s, flags: r },
              engineSettings: v,
            };
            'image' == t
              ? (r.auto ||
                  ((n.style.width = o.width + 'px'),
                  (n.style.height = o.height + 'px')),
                'html' == v.renderer
                  ? (n.style.backgroundColor = s.background)
                  : (a(b),
                    'exact' == r.textmode &&
                      ((n.holderData.resizeUpdate = !0),
                      F.vars.resizableImages.push(n),
                      h(n))))
              : 'background' == t && 'html' != v.renderer
                ? a(b)
                : 'fluid' == t &&
                  ((n.holderData.resizeUpdate = !0),
                  '%' == o.height.slice(-1)
                    ? (n.style.height = o.height)
                    : (null != r.auto && r.auto) ||
                      (n.style.height = o.height + 'px'),
                  '%' == o.width.slice(-1)
                    ? (n.style.width = o.width)
                    : (null != r.auto && r.auto) ||
                      (n.style.width = o.width + 'px'),
                  ('inline' == n.style.display ||
                    '' === n.style.display ||
                    'none' == n.style.display) &&
                    (n.style.display = 'block'),
                  u(n),
                  'html' == v.renderer
                    ? (n.style.backgroundColor = s.background)
                    : (F.vars.resizableImages.push(n), h(n)));
          }
          function a(e) {
            function n() {
              var t = null;
              switch (l.renderer) {
                case 'canvas':
                  t = E(u, e);
                  break;
                case 'svg':
                  t = C(u, e);
                  break;
                default:
                  throw 'Holder: invalid renderer: ' + l.renderer;
              }
              return t;
            }
            var r = null,
              i = e.mode,
              o = e.el,
              a = e.holderSettings,
              l = e.engineSettings;
            switch (l.renderer) {
              case 'svg':
                if (!F.setup.supportsSVG) return;
                break;
              case 'canvas':
                if (!F.setup.supportsCanvas) return;
                break;
              default:
                return;
            }
            var h = {
                width: a.dimensions.width,
                height: a.dimensions.height,
                theme: a.theme,
                flags: a.flags,
              },
              u = s(h);
            if (((r = n()), null == r))
              throw "Holder: couldn't render placeholder";
            'background' == i
              ? ((o.style.backgroundImage = 'url(' + r + ')'),
                (o.style.backgroundSize = h.width + 'px ' + h.height + 'px'))
              : ('img' === o.nodeName.toLowerCase()
                  ? x.setAttr(o, { src: r })
                  : 'object' === o.nodeName.toLowerCase() &&
                    x.setAttr(o, { data: r, type: 'image/svg+xml' }),
                l.reRender &&
                  t.setTimeout(function () {
                    var e = n();
                    if (null == e) throw "Holder: couldn't render placeholder";
                    'img' === o.nodeName.toLowerCase()
                      ? x.setAttr(o, { src: e })
                      : 'object' === o.nodeName.toLowerCase() &&
                        x.setAttr(o, { data: e, type: 'image/svg+xml' });
                  }, 150)),
              x.setAttr(o, { 'data-holder-rendered': !0 });
          }
          function s(e) {
            function t(e, t, n, r) {
              (t.width = n),
                (t.height = r),
                (e.width = Math.max(e.width, t.width)),
                (e.height += t.height);
            }
            var n = F.defaults.size;
            switch (
              (parseFloat(e.theme.size)
                ? (n = e.theme.size)
                : parseFloat(e.flags.size) && (n = e.flags.size),
              (e.font = {
                family: e.theme.font
                  ? e.theme.font
                  : 'Arial, Helvetica, Open Sans, sans-serif',
                size: l(e.width, e.height, n, F.defaults.scale),
                units: e.theme.units ? e.theme.units : F.defaults.units,
                weight: e.theme.fontweight ? e.theme.fontweight : 'bold',
              }),
              (e.text =
                e.theme.text ||
                Math.floor(e.width) + 'x' + Math.floor(e.height)),
              (e.noWrap = e.theme.nowrap || e.flags.nowrap),
              (e.align = e.theme.align || e.flags.align || 'center'),
              e.flags.textmode)
            ) {
              case 'literal':
                e.text =
                  e.flags.dimensions.width + 'x' + e.flags.dimensions.height;
                break;
              case 'exact':
                if (!e.flags.exactDimensions) break;
                e.text =
                  Math.floor(e.flags.exactDimensions.width) +
                  'x' +
                  Math.floor(e.flags.exactDimensions.height);
            }
            var r = e.flags.lineWrap || F.setup.lineWrapRatio,
              i = e.width * r,
              o = i,
              a = new y({ width: e.width, height: e.height }),
              s = a.Shape,
              h = new s.Rect('holderBg', { fill: e.theme.bg });
            if ((h.resize(e.width, e.height), a.root.add(h), e.flags.outline)) {
              var u = new S(h.properties.fill);
              (u = u.lighten(u.lighterThan('7f7f7f') ? -0.1 : 0.1)),
                (h.properties.outline = { fill: u.toHex(!0), width: 2 });
            }
            var d = e.theme.fg;
            if (e.flags.autoFg) {
              var c = new S(h.properties.fill),
                f = new S('fff'),
                p = new S('000', { alpha: 0.285714 });
              d = c.blendAlpha(c.lighterThan('7f7f7f') ? p : f).toHex(!0);
            }
            var g = new s.Group('holderTextGroup', {
              text: e.text,
              align: e.align,
              font: e.font,
              fill: d,
            });
            g.moveTo(null, null, 1), a.root.add(g);
            var m = (g.textPositionData = z(a));
            if (!m) throw 'Holder: staging fallback not supported yet.';
            g.properties.leading = m.boundingBox.height;
            var v = null,
              w = null;
            if (m.lineCount > 1) {
              var b,
                x = 0,
                A = 0,
                C = 0;
              (w = new s.Group('line' + C)),
                ('left' === e.align || 'right' === e.align) &&
                  (o = e.width * (1 - 2 * (1 - r)));
              for (var E = 0; E < m.words.length; E++) {
                var T = m.words[E];
                v = new s.Text(T.text);
                var k = '\\n' == T.text;
                !e.noWrap &&
                  (x + T.width >= o || k === !0) &&
                  (t(g, w, x, g.properties.leading),
                  g.add(w),
                  (x = 0),
                  (A += g.properties.leading),
                  (C += 1),
                  (w = new s.Group('line' + C)),
                  (w.y = A)),
                  k !== !0 &&
                    (v.moveTo(x, 0), (x += m.spaceWidth + T.width), w.add(v));
              }
              if (
                (t(g, w, x, g.properties.leading), g.add(w), 'left' === e.align)
              )
                g.moveTo(e.width - i, null, null);
              else if ('right' === e.align) {
                for (b in g.children)
                  (w = g.children[b]), w.moveTo(e.width - w.width, null, null);
                g.moveTo(0 - (e.width - i), null, null);
              } else {
                for (b in g.children)
                  (w = g.children[b]),
                    w.moveTo((g.width - w.width) / 2, null, null);
                g.moveTo((e.width - g.width) / 2, null, null);
              }
              g.moveTo(null, (e.height - g.height) / 2, null),
                (e.height - g.height) / 2 < 0 && g.moveTo(null, 0, null);
            } else
              (v = new s.Text(e.text)),
                (w = new s.Group('line0')),
                w.add(v),
                g.add(w),
                'left' === e.align
                  ? g.moveTo(e.width - i, null, null)
                  : 'right' === e.align
                    ? g.moveTo(0 - (e.width - i), null, null)
                    : g.moveTo((e.width - m.boundingBox.width) / 2, null, null),
                g.moveTo(null, (e.height - m.boundingBox.height) / 2, null);
            return a;
          }
          function l(e, t, n, r) {
            var i = parseInt(e, 10),
              o = parseInt(t, 10),
              a = Math.max(i, o),
              s = Math.min(i, o),
              l = 0.8 * Math.min(s, a * r);
            return Math.round(Math.max(n, l));
          }
          function h(e) {
            var t;
            t = null == e || null == e.nodeType ? F.vars.resizableImages : [e];
            for (var n = 0, r = t.length; r > n; n++) {
              var i = t[n];
              if (i.holderData) {
                var o = i.holderData.flags,
                  s = k(i);
                if (s) {
                  if (!i.holderData.resizeUpdate) continue;
                  if (o.fluid && o.auto) {
                    var l = i.holderData.fluidConfig;
                    switch (l.mode) {
                      case 'width':
                        s.height = s.width / l.ratio;
                        break;
                      case 'height':
                        s.width = s.height * l.ratio;
                    }
                  }
                  var h = {
                    mode: 'image',
                    holderSettings: { dimensions: s, theme: o.theme, flags: o },
                    el: i,
                    engineSettings: i.holderData.engineSettings,
                  };
                  'exact' == o.textmode &&
                    ((o.exactDimensions = s),
                    (h.holderSettings.dimensions = o.dimensions)),
                    a(h);
                } else f(i);
              }
            }
          }
          function u(e) {
            if (e.holderData) {
              var t = k(e);
              if (t) {
                var n = e.holderData.flags,
                  r = {
                    fluidHeight: '%' == n.dimensions.height.slice(-1),
                    fluidWidth: '%' == n.dimensions.width.slice(-1),
                    mode: null,
                    initialDimensions: t,
                  };
                r.fluidWidth && !r.fluidHeight
                  ? ((r.mode = 'width'),
                    (r.ratio =
                      r.initialDimensions.width /
                      parseFloat(n.dimensions.height)))
                  : !r.fluidWidth &&
                    r.fluidHeight &&
                    ((r.mode = 'height'),
                    (r.ratio =
                      parseFloat(n.dimensions.width) /
                      r.initialDimensions.height)),
                  (e.holderData.fluidConfig = r);
              } else f(e);
            }
          }
          function d() {
            var e,
              n = [],
              r = Object.keys(F.vars.invisibleImages);
            r.forEach(function (t) {
              (e = F.vars.invisibleImages[t]),
                k(e) &&
                  'img' == e.nodeName.toLowerCase() &&
                  (n.push(e), delete F.vars.invisibleImages[t]);
            }),
              n.length && O.run({ images: n }),
              setTimeout(function () {
                t.requestAnimationFrame(d);
              }, 10);
          }
          function c() {
            F.vars.visibilityCheckStarted ||
              (t.requestAnimationFrame(d),
              (F.vars.visibilityCheckStarted = !0));
          }
          function f(e) {
            e.holderData.invisibleId ||
              ((F.vars.invisibleId += 1),
              (F.vars.invisibleImages['i' + F.vars.invisibleId] = e),
              (e.holderData.invisibleId = F.vars.invisibleId));
          }
          function p(e) {
            F.vars.debounceTimer || e.call(this),
              F.vars.debounceTimer && t.clearTimeout(F.vars.debounceTimer),
              (F.vars.debounceTimer = t.setTimeout(function () {
                (F.vars.debounceTimer = null), e.call(this);
              }, F.setup.debounce));
          }
          function g() {
            p(function () {
              h(null);
            });
          }
          var m = n(2),
            v = n(3),
            y = n(6),
            w = n(7),
            b = n(8),
            x = n(9),
            S = n(10),
            A = n(11),
            C = n(12),
            E = n(15),
            T = w.extend,
            k = w.dimensionCheck,
            j = A.svg_ns,
            O = {
              version: A.version,
              addTheme: function (e, t) {
                return (
                  null != e && null != t && (F.settings.themes[e] = t),
                  delete F.vars.cache.themeKeys,
                  this
                );
              },
              addImage: function (e, t) {
                var n = x.getNodeArray(t);
                return (
                  n.forEach(function (t) {
                    var n = x.newEl('img'),
                      r = {};
                    (r[F.setup.dataAttr] = e),
                      x.setAttr(n, r),
                      t.appendChild(n);
                  }),
                  this
                );
              },
              setResizeUpdate: function (e, t) {
                e.holderData &&
                  ((e.holderData.resizeUpdate = !!t),
                  e.holderData.resizeUpdate && h(e));
              },
              run: function (e) {
                e = e || {};
                var n = {},
                  a = T(F.settings, e);
                (F.vars.preempted = !0),
                  (F.vars.dataAttr = a.dataAttr || F.setup.dataAttr),
                  (n.renderer = a.renderer ? a.renderer : F.setup.renderer),
                  -1 === F.setup.renderers.join(',').indexOf(n.renderer) &&
                    (n.renderer = F.setup.supportsSVG
                      ? 'svg'
                      : F.setup.supportsCanvas
                        ? 'canvas'
                        : 'html');
                var s = x.getNodeArray(a.images),
                  l = x.getNodeArray(a.bgnodes),
                  h = x.getNodeArray(a.stylenodes),
                  u = x.getNodeArray(a.objects);
                return (
                  (n.stylesheets = []),
                  (n.svgXMLStylesheet = !0),
                  (n.noFontFallback = a.noFontFallback ? a.noFontFallback : !1),
                  h.forEach(function (e) {
                    if (
                      e.attributes.rel &&
                      e.attributes.href &&
                      'stylesheet' == e.attributes.rel.value
                    ) {
                      var t = e.attributes.href.value,
                        r = x.newEl('a');
                      r.href = t;
                      var i =
                        r.protocol + '//' + r.host + r.pathname + r.search;
                      n.stylesheets.push(i);
                    }
                  }),
                  l.forEach(function (e) {
                    if (t.getComputedStyle) {
                      var r = t
                          .getComputedStyle(e, null)
                          .getPropertyValue('background-image'),
                        s = e.getAttribute('data-background-src'),
                        l = s || r,
                        h = null,
                        u = a.domain + '/',
                        d = l.indexOf(u);
                      if (0 === d) h = l;
                      else if (1 === d && '?' === l[0]) h = l.slice(1);
                      else {
                        var c = l.substr(d).match(/([^\"]*)"?\)/);
                        if (null !== c) h = c[1];
                        else if (0 === l.indexOf('url('))
                          throw 'Holder: unable to parse background URL: ' + l;
                      }
                      if (null != h) {
                        var f = i(h, a);
                        f &&
                          o({
                            mode: 'background',
                            el: e,
                            flags: f,
                            engineSettings: n,
                          });
                      }
                    }
                  }),
                  u.forEach(function (e) {
                    var t = {};
                    try {
                      (t.data = e.getAttribute('data')),
                        (t.dataSrc = e.getAttribute(F.vars.dataAttr));
                    } catch (i) {}
                    var o = null != t.data && 0 === t.data.indexOf(a.domain),
                      s =
                        null != t.dataSrc && 0 === t.dataSrc.indexOf(a.domain);
                    o ? r(a, n, t.data, e) : s && r(a, n, t.dataSrc, e);
                  }),
                  s.forEach(function (e) {
                    var t = {};
                    try {
                      (t.src = e.getAttribute('src')),
                        (t.dataSrc = e.getAttribute(F.vars.dataAttr)),
                        (t.rendered = e.getAttribute('data-holder-rendered'));
                    } catch (i) {}
                    var o = null != t.src,
                      s =
                        null != t.dataSrc && 0 === t.dataSrc.indexOf(a.domain),
                      l = null != t.rendered && 'true' == t.rendered;
                    o
                      ? 0 === t.src.indexOf(a.domain)
                        ? r(a, n, t.src, e)
                        : s &&
                          (l
                            ? r(a, n, t.dataSrc, e)
                            : !(function (e, t, n, i, o) {
                                w.imageExists(e, function (e) {
                                  e || r(t, n, i, o);
                                });
                              })(t.src, a, n, t.dataSrc, e))
                      : s && r(a, n, t.dataSrc, e);
                  }),
                  this
                );
              },
            },
            F = {
              settings: {
                domain: 'holder.js',
                images: 'img',
                objects: 'object',
                bgnodes: 'body .holderjs',
                stylenodes: 'head link.holderjs',
                themes: {
                  gray: { bg: '#EEEEEE', fg: '#AAAAAA' },
                  social: { bg: '#3a5a97', fg: '#FFFFFF' },
                  industrial: { bg: '#434A52', fg: '#C2F200' },
                  sky: { bg: '#0D8FDB', fg: '#FFFFFF' },
                  vine: { bg: '#39DBAC', fg: '#1E292C' },
                  lava: { bg: '#F8591A', fg: '#1C2846' },
                },
              },
              defaults: { size: 10, units: 'pt', scale: 1 / 16 },
            },
            z = (function () {
              var e = null,
                t = null,
                n = null;
              return function (r) {
                var i = r.root;
                if (F.setup.supportsSVG) {
                  var o = !1,
                    a = function (e) {
                      return document.createTextNode(e);
                    };
                  (null == e || e.parentNode !== document.body) && (o = !0),
                    (e = b.initSVG(e, i.properties.width, i.properties.height)),
                    (e.style.display = 'block'),
                    o &&
                      ((t = x.newEl('text', j)),
                      (n = a(null)),
                      x.setAttr(t, { x: 0 }),
                      t.appendChild(n),
                      e.appendChild(t),
                      document.body.appendChild(e),
                      (e.style.visibility = 'hidden'),
                      (e.style.position = 'absolute'),
                      (e.style.top = '-100%'),
                      (e.style.left = '-100%'));
                  var s = i.children.holderTextGroup,
                    l = s.properties;
                  x.setAttr(t, {
                    y: l.font.size,
                    style: w.cssProps({
                      'font-weight': l.font.weight,
                      'font-size': l.font.size + l.font.units,
                      'font-family': l.font.family,
                    }),
                  }),
                    (n.nodeValue = l.text);
                  var h = t.getBBox(),
                    u = Math.ceil(h.width / i.properties.width),
                    d = l.text.split(' '),
                    c = l.text.match(/\\n/g);
                  (u += null == c ? 0 : c.length),
                    (n.nodeValue = l.text.replace(/[ ]+/g, ''));
                  var f = t.getComputedTextLength(),
                    p = h.width - f,
                    g = Math.round(p / Math.max(1, d.length - 1)),
                    m = [];
                  if (u > 1) {
                    n.nodeValue = '';
                    for (var v = 0; v < d.length; v++)
                      if (0 !== d[v].length) {
                        n.nodeValue = w.decodeHtmlEntity(d[v]);
                        var y = t.getBBox();
                        m.push({ text: d[v], width: y.width });
                      }
                  }
                  return (
                    (e.style.display = 'none'),
                    { spaceWidth: g, lineCount: u, boundingBox: h, words: m }
                  );
                }
                return !1;
              };
            })();
          for (var D in F.flags)
            F.flags.hasOwnProperty(D) &&
              (F.flags[D].match = function (e) {
                return e.match(this.regex);
              });
          (F.setup = {
            renderer: 'html',
            debounce: 100,
            ratio: 1,
            supportsCanvas: !1,
            supportsSVG: !1,
            lineWrapRatio: 0.9,
            dataAttr: 'data-src',
            renderers: ['html', 'canvas', 'svg'],
          }),
            (F.vars = {
              preempted: !1,
              resizableImages: [],
              invisibleImages: {},
              invisibleId: 0,
              visibilityCheckStarted: !1,
              debounceTimer: null,
              cache: {},
            }),
            (function () {
              var e = x.newEl('canvas');
              e.getContext &&
                -1 != e.toDataURL('image/png').indexOf('data:image/png') &&
                ((F.setup.renderer = 'canvas'), (F.setup.supportsCanvas = !0)),
                document.createElementNS &&
                  document.createElementNS(j, 'svg').createSVGRect &&
                  ((F.setup.renderer = 'svg'), (F.setup.supportsSVG = !0));
            })(),
            c(),
            m &&
              m(function () {
                F.vars.preempted || O.run(),
                  t.addEventListener
                    ? (t.addEventListener('resize', g, !1),
                      t.addEventListener('orientationchange', g, !1))
                    : t.attachEvent('onresize', g),
                  'object' == typeof t.Turbolinks &&
                    t.document.addEventListener('page:change', function () {
                      O.run();
                    });
              }),
            (e.exports = O);
        }).call(
          t,
          (function () {
            return this;
          })()
        );
      },
      function (e, t) {
        function n(e) {
          function t(e) {
            if (!x) {
              if (!a.body) return i(t);
              for (x = !0; (e = S.shift()); ) i(e);
            }
          }
          function n(e) {
            (w || e.type === l || a[c] === d) && (r(), t());
          }
          function r() {
            w ? (a[y](m, n, h), e[y](l, n, h)) : (a[p](v, n), e[p](u, n));
          }
          function i(e, t) {
            setTimeout(e, +t >= 0 ? t : 1);
          }
          function o(e) {
            x ? i(e) : S.push(e);
          }
          null == document.readyState &&
            document.addEventListener &&
            (document.addEventListener(
              'DOMContentLoaded',
              function C() {
                document.removeEventListener('DOMContentLoaded', C, !1),
                  (document.readyState = 'complete');
              },
              !1
            ),
            (document.readyState = 'loading'));
          var a = e.document,
            s = a.documentElement,
            l = 'load',
            h = !1,
            u = 'on' + l,
            d = 'complete',
            c = 'readyState',
            f = 'attachEvent',
            p = 'detachEvent',
            g = 'addEventListener',
            m = 'DOMContentLoaded',
            v = 'onreadystatechange',
            y = 'removeEventListener',
            w = g in a,
            b = h,
            x = h,
            S = [];
          if (a[c] === d) i(t);
          else if (w) a[g](m, n, h), e[g](l, n, h);
          else {
            a[f](v, n), e[f](u, n);
            try {
              b = null == e.frameElement && s;
            } catch (A) {}
            b &&
              b.doScroll &&
              !(function E() {
                if (!x) {
                  try {
                    b.doScroll('left');
                  } catch (e) {
                    return i(E, 50);
                  }
                  r(), t();
                }
              })();
          }
          return (
            (o.version = '1.4.0'),
            (o.isReady = function () {
              return x;
            }),
            o
          );
        }
        e.exports = 'undefined' != typeof window && n(window);
      },
      function (e, t, n) {
        var r = encodeURIComponent,
          i = decodeURIComponent,
          o = n(4),
          a = n(5),
          s = /(\w+)\[(\d+)\]/,
          l = /\w+\.\w+/;
        (t.parse = function (e) {
          if ('string' != typeof e) return {};
          if (((e = o(e)), '' === e)) return {};
          '?' === e.charAt(0) && (e = e.slice(1));
          for (var t = {}, n = e.split('&'), r = 0; r < n.length; r++) {
            var a,
              h,
              u,
              d = n[r].split('='),
              c = i(d[0]);
            if ((a = s.exec(c)))
              (t[a[1]] = t[a[1]] || []), (t[a[1]][a[2]] = i(d[1]));
            else if ((a = l.test(c))) {
              for (a = c.split('.'), h = t; a.length; )
                if (((u = a.shift()), u.length)) {
                  if (h[u]) {
                    if (h[u] && 'object' != typeof h[u]) break;
                  } else h[u] = {};
                  a.length || (h[u] = i(d[1])), (h = h[u]);
                }
            } else t[d[0]] = null == d[1] ? '' : i(d[1]);
          }
          return t;
        }),
          (t.stringify = function (e) {
            if (!e) return '';
            var t = [];
            for (var n in e) {
              var i = e[n];
              if ('array' != a(i)) t.push(r(n) + '=' + r(e[n]));
              else
                for (var o = 0; o < i.length; ++o)
                  t.push(r(n + '[' + o + ']') + '=' + r(i[o]));
            }
            return t.join('&');
          });
      },
      function (e, t) {
        function n(e) {
          return e.replace(/^\s*|\s*$/g, '');
        }
        (t = e.exports = n),
          (t.left = function (e) {
            return e.replace(/^\s*/, '');
          }),
          (t.right = function (e) {
            return e.replace(/\s*$/, '');
          });
      },
      function (e, t) {
        var n = Object.prototype.toString;
        e.exports = function (e) {
          switch (n.call(e)) {
            case '[object Date]':
              return 'date';
            case '[object RegExp]':
              return 'regexp';
            case '[object Arguments]':
              return 'arguments';
            case '[object Array]':
              return 'array';
            case '[object Error]':
              return 'error';
          }
          return null === e
            ? 'null'
            : void 0 === e
              ? 'undefined'
              : e !== e
                ? 'nan'
                : e && 1 === e.nodeType
                  ? 'element'
                  : ((e = e.valueOf
                      ? e.valueOf()
                      : Object.prototype.valueOf.apply(e)),
                    typeof e);
        };
      },
      function (e, t) {
        var n = function (e) {
          function t(e, t) {
            for (var n in t) e[n] = t[n];
            return e;
          }
          var n = 1,
            r = function (e) {
              n++,
                (this.parent = null),
                (this.children = {}),
                (this.id = n),
                (this.name = 'n' + n),
                'undefined' != typeof e && (this.name = e),
                (this.x = this.y = this.z = 0),
                (this.width = this.height = 0);
            };
          (r.prototype.resize = function (e, t) {
            null != e && (this.width = e), null != t && (this.height = t);
          }),
            (r.prototype.moveTo = function (e, t, n) {
              (this.x = null != e ? e : this.x),
                (this.y = null != t ? t : this.y),
                (this.z = null != n ? n : this.z);
            }),
            (r.prototype.add = function (e) {
              var t = e.name;
              if ('undefined' != typeof this.children[t])
                throw 'SceneGraph: child already exists: ' + t;
              (this.children[t] = e), (e.parent = this);
            });
          var i = function () {
            r.call(this, 'root'), (this.properties = e);
          };
          i.prototype = new r();
          var o = function (e, n) {
            if (
              (r.call(this, e),
              (this.properties = { fill: '#000000' }),
              'undefined' != typeof n)
            )
              t(this.properties, n);
            else if ('undefined' != typeof e && 'string' != typeof e)
              throw 'SceneGraph: invalid node name';
          };
          o.prototype = new r();
          var a = function () {
            o.apply(this, arguments), (this.type = 'group');
          };
          a.prototype = new o();
          var s = function () {
            o.apply(this, arguments), (this.type = 'rect');
          };
          s.prototype = new o();
          var l = function (e) {
            o.call(this), (this.type = 'text'), (this.properties.text = e);
          };
          l.prototype = new o();
          var h = new i();
          return (
            (this.Shape = { Rect: s, Text: l, Group: a }), (this.root = h), this
          );
        };
        e.exports = n;
      },
      function (e, t) {
        (function (e) {
          (t.extend = function (e, t) {
            var n = {};
            for (var r in e) e.hasOwnProperty(r) && (n[r] = e[r]);
            if (null != t)
              for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]);
            return n;
          }),
            (t.cssProps = function (e) {
              var t = [];
              for (var n in e) e.hasOwnProperty(n) && t.push(n + ':' + e[n]);
              return t.join(';');
            }),
            (t.encodeHtmlEntity = function (e) {
              for (var t = [], n = 0, r = e.length - 1; r >= 0; r--)
                (n = e.charCodeAt(r)),
                  n > 128
                    ? t.unshift(['&#', n, ';'].join(''))
                    : t.unshift(e[r]);
              return t.join('');
            }),
            (t.imageExists = function (e, t) {
              var n = new Image();
              (n.onerror = function () {
                t.call(this, !1);
              }),
                (n.onload = function () {
                  t.call(this, !0);
                }),
                (n.src = e);
            }),
            (t.decodeHtmlEntity = function (e) {
              return e.replace(/&#(\d+);/g, function (e, t) {
                return String.fromCharCode(t);
              });
            }),
            (t.dimensionCheck = function (e) {
              var t = { height: e.clientHeight, width: e.clientWidth };
              return t.height && t.width ? t : !1;
            }),
            (t.truthy = function (e) {
              return 'string' == typeof e
                ? 'true' === e ||
                    'yes' === e ||
                    '1' === e ||
                    'on' === e ||
                    '✓' === e
                : !!e;
            }),
            (t.parseColor = function (e) {
              var t,
                n = /(^(?:#?)[0-9a-f]{6}$)|(^(?:#?)[0-9a-f]{3}$)/i,
                r = /^rgb\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
                i =
                  /^rgba\((\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0\.\d{1,}|1)\)$/,
                o = e.match(n);
              return null !== o
                ? ((t = o[1] || o[2]), '#' !== t[0] ? '#' + t : t)
                : ((o = e.match(r)),
                  null !== o
                    ? (t = 'rgb(' + o.slice(1).join(',') + ')')
                    : ((o = e.match(i)),
                      null !== o
                        ? (t = 'rgba(' + o.slice(1).join(',') + ')')
                        : null));
            }),
            (t.canvasRatio = function () {
              var t = 1,
                n = 1;
              if (e.document) {
                var r = e.document.createElement('canvas');
                if (r.getContext) {
                  var i = r.getContext('2d');
                  (t = e.devicePixelRatio || 1),
                    (n =
                      i.webkitBackingStorePixelRatio ||
                      i.mozBackingStorePixelRatio ||
                      i.msBackingStorePixelRatio ||
                      i.oBackingStorePixelRatio ||
                      i.backingStorePixelRatio ||
                      1);
                }
              }
              return t / n;
            });
        }).call(
          t,
          (function () {
            return this;
          })()
        );
      },
      function (e, t, n) {
        (function (e) {
          var r = n(9),
            i = 'http://www.w3.org/2000/svg',
            o = 8;
          (t.initSVG = function (e, t, n) {
            var a,
              s,
              l = !1;
            e && e.querySelector
              ? ((s = e.querySelector('style')), null === s && (l = !0))
              : ((e = r.newEl('svg', i)), (l = !0)),
              l &&
                ((a = r.newEl('defs', i)),
                (s = r.newEl('style', i)),
                r.setAttr(s, { type: 'text/css' }),
                a.appendChild(s),
                e.appendChild(a)),
              e.webkitMatchesSelector && e.setAttribute('xmlns', i);
            for (var h = 0; h < e.childNodes.length; h++)
              e.childNodes[h].nodeType === o && e.removeChild(e.childNodes[h]);
            for (; s.childNodes.length; ) s.removeChild(s.childNodes[0]);
            return (
              r.setAttr(e, {
                width: t,
                height: n,
                viewBox: '0 0 ' + t + ' ' + n,
                preserveAspectRatio: 'none',
              }),
              e
            );
          }),
            (t.svgStringToDataURI = (function () {
              var t = 'data:image/svg+xml;charset=UTF-8,',
                n = 'data:image/svg+xml;charset=UTF-8;base64,';
              return function (r, i) {
                return i
                  ? n + btoa(e.unescape(encodeURIComponent(r)))
                  : t + encodeURIComponent(r);
              };
            })()),
            (t.serializeSVG = function (t, n) {
              if (e.XMLSerializer) {
                var i = new XMLSerializer(),
                  o = '',
                  a = n.stylesheets;
                if (n.svgXMLStylesheet) {
                  for (var s = r.createXML(), l = a.length - 1; l >= 0; l--) {
                    var h = s.createProcessingInstruction(
                      'xml-stylesheet',
                      'href="' + a[l] + '" rel="stylesheet"'
                    );
                    s.insertBefore(h, s.firstChild);
                  }
                  s.removeChild(s.documentElement),
                    (o = i.serializeToString(s));
                }
                var u = i.serializeToString(t);
                return (u = u.replace(/\&amp;(\#[0-9]{2,}\;)/g, '&$1')), o + u;
              }
            });
        }).call(
          t,
          (function () {
            return this;
          })()
        );
      },
      function (e, t) {
        (function (e) {
          (t.newEl = function (t, n) {
            return e.document
              ? null == n
                ? e.document.createElement(t)
                : e.document.createElementNS(n, t)
              : void 0;
          }),
            (t.setAttr = function (e, t) {
              for (var n in t) e.setAttribute(n, t[n]);
            }),
            (t.createXML = function () {
              return e.DOMParser
                ? new DOMParser().parseFromString('<xml />', 'application/xml')
                : void 0;
            }),
            (t.getNodeArray = function (t) {
              var n = null;
              return (
                'string' == typeof t
                  ? (n = document.querySelectorAll(t))
                  : e.NodeList && t instanceof e.NodeList
                    ? (n = t)
                    : e.Node && t instanceof e.Node
                      ? (n = [t])
                      : e.HTMLCollection && t instanceof e.HTMLCollection
                        ? (n = t)
                        : t instanceof Array
                          ? (n = t)
                          : null === t && (n = []),
                (n = Array.prototype.slice.call(n))
              );
            });
        }).call(
          t,
          (function () {
            return this;
          })()
        );
      },
      function (e, t) {
        var n = function (e, t) {
          'string' == typeof e &&
            ((this.original = e),
            '#' === e.charAt(0) && (e = e.slice(1)),
            /[^a-f0-9]+/i.test(e) ||
              (3 === e.length && (e = e.replace(/./g, '$&$&')),
              6 === e.length &&
                ((this.alpha = 1),
                t && t.alpha && (this.alpha = t.alpha),
                this.set(parseInt(e, 16)))));
        };
        (n.rgb2hex = function (e, t, n) {
          function r(e) {
            var t = (0 | e).toString(16);
            return 16 > e && (t = '0' + t), t;
          }
          return [e, t, n].map(r).join('');
        }),
          (n.hsl2rgb = function (e, t, n) {
            var r = e / 60,
              i = (1 - Math.abs(2 * n - 1)) * t,
              o = i * (1 - Math.abs((parseInt(r) % 2) - 1)),
              a = n - i / 2,
              s = 0,
              l = 0,
              h = 0;
            return (
              r >= 0 && 1 > r
                ? ((s = i), (l = o))
                : r >= 1 && 2 > r
                  ? ((s = o), (l = i))
                  : r >= 2 && 3 > r
                    ? ((l = i), (h = o))
                    : r >= 3 && 4 > r
                      ? ((l = o), (h = i))
                      : r >= 4 && 5 > r
                        ? ((s = o), (h = i))
                        : r >= 5 && 6 > r && ((s = i), (h = o)),
              (s += a),
              (l += a),
              (h += a),
              (s = parseInt(255 * s)),
              (l = parseInt(255 * l)),
              (h = parseInt(255 * h)),
              [s, l, h]
            );
          }),
          (n.prototype.set = function (e) {
            this.raw = e;
            var t = (16711680 & this.raw) >> 16,
              n = (65280 & this.raw) >> 8,
              r = 255 & this.raw,
              i = 0.2126 * t + 0.7152 * n + 0.0722 * r,
              o = -0.09991 * t - 0.33609 * n + 0.436 * r,
              a = 0.615 * t - 0.55861 * n - 0.05639 * r;
            return (
              (this.rgb = { r: t, g: n, b: r }),
              (this.yuv = { y: i, u: o, v: a }),
              this
            );
          }),
          (n.prototype.lighten = function (e) {
            var t = Math.min(1, Math.max(0, Math.abs(e))) * (0 > e ? -1 : 1),
              r = (255 * t) | 0,
              i = Math.min(255, Math.max(0, this.rgb.r + r)),
              o = Math.min(255, Math.max(0, this.rgb.g + r)),
              a = Math.min(255, Math.max(0, this.rgb.b + r)),
              s = n.rgb2hex(i, o, a);
            return new n(s);
          }),
          (n.prototype.toHex = function (e) {
            return (e ? '#' : '') + this.raw.toString(16);
          }),
          (n.prototype.lighterThan = function (e) {
            return e instanceof n || (e = new n(e)), this.yuv.y > e.yuv.y;
          }),
          (n.prototype.blendAlpha = function (e) {
            e instanceof n || (e = new n(e));
            var t = e,
              r = this,
              i = t.alpha * t.rgb.r + (1 - t.alpha) * r.rgb.r,
              o = t.alpha * t.rgb.g + (1 - t.alpha) * r.rgb.g,
              a = t.alpha * t.rgb.b + (1 - t.alpha) * r.rgb.b;
            return new n(n.rgb2hex(i, o, a));
          }),
          (e.exports = n);
      },
      function (e, t) {
        e.exports = { version: '2.9.0', svg_ns: 'http://www.w3.org/2000/svg' };
      },
      function (e, t, n) {
        function r(e, t) {
          return d.element({
            tag: t,
            width: e.width,
            height: e.height,
            fill: e.properties.fill,
          });
        }
        function i(e) {
          return h.cssProps({
            fill: e.fill,
            'font-weight': e.font.weight,
            'font-family': e.font.family + ', monospace',
            'font-size': e.font.size + e.font.units,
          });
        }
        function o(e, t, n) {
          var r = n / 2;
          return [
            'M',
            r,
            r,
            'H',
            e - r,
            'V',
            t - r,
            'H',
            r,
            'V',
            0,
            'M',
            0,
            r,
            'L',
            e,
            t - r,
            'M',
            0,
            t - r,
            'L',
            e,
            r,
          ].join(' ');
        }
        var a = n(13),
          s = n(8),
          l = n(11),
          h = n(7),
          u = l.svg_ns,
          d = {
            element: function (e) {
              var t = e.tag,
                n = e.content || '';
              return delete e.tag, delete e.content, [t, n, e];
            },
          };
        e.exports = function (e, t) {
          var n = t.engineSettings,
            l = n.stylesheets,
            h = l
              .map(function (e) {
                return '<?xml-stylesheet rel="stylesheet" href="' + e + '"?>';
              })
              .join('\n'),
            c = 'holder_' + Number(new Date()).toString(16),
            f = e.root,
            p = f.children.holderTextGroup,
            g = '#' + c + ' text { ' + i(p.properties) + ' } ';
          p.y += 0.8 * p.textPositionData.boundingBox.height;
          var m = [];
          Object.keys(p.children).forEach(function (e) {
            var t = p.children[e];
            Object.keys(t.children).forEach(function (e) {
              var n = t.children[e],
                r = p.x + t.x + n.x,
                i = p.y + t.y + n.y,
                o = d.element({
                  tag: 'text',
                  content: n.properties.text,
                  x: r,
                  y: i,
                });
              m.push(o);
            });
          });
          var v = d.element({ tag: 'g', content: m }),
            y = null;
          if (f.children.holderBg.properties.outline) {
            var w = f.children.holderBg.properties.outline;
            y = d.element({
              tag: 'path',
              d: o(
                f.children.holderBg.width,
                f.children.holderBg.height,
                w.width
              ),
              'stroke-width': w.width,
              stroke: w.fill,
              fill: 'none',
            });
          }
          var b = r(f.children.holderBg, 'rect'),
            x = [];
          x.push(b), w && x.push(y), x.push(v);
          var S = d.element({ tag: 'g', id: c, content: x }),
            A = d.element({ tag: 'style', content: g, type: 'text/css' }),
            C = d.element({ tag: 'defs', content: A }),
            E = d.element({
              tag: 'svg',
              content: [C, S],
              width: f.properties.width,
              height: f.properties.height,
              xmlns: u,
              viewBox: [0, 0, f.properties.width, f.properties.height].join(
                ' '
              ),
              preserveAspectRatio: 'none',
            }),
            T = a(E);
          T = h + T[0];
          var k = s.svgStringToDataURI(T, 'background' === t.mode);
          return k;
        };
      },
      function (e, t, n) {
        n(14);
        e.exports = function r(e, t, n) {
          'use strict';
          function i(e) {
            var t = e.match(/^\w+/),
              r = { tag: t ? t[0] : 'div', attr: {}, children: [] },
              i = e.match(/#([\w-]+)/),
              o = e.match(/\$([\w-]+)/),
              a = e.match(/\.[\w-]+/g);
            return (
              i && ((r.attr.id = i[1]), (n[i[1]] = r)),
              o && (n[o[1]] = r),
              a && (r.attr['class'] = a.join(' ').replace(/\./g, '')),
              e.match(/&$/g) && (f = !1),
              r
            );
          }
          function o(e, t) {
            return null !== t && t !== !1 && void 0 !== t
              ? 'string' != typeof t && 'object' != typeof t
                ? String(t)
                : t
              : void 0;
          }
          function a(e) {
            return String(e).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
          }
          function s(e) {
            return String(e)
              .replace(/&/g, '&amp;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&apos;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;');
          }
          var l,
            h,
            u,
            d,
            c = 1,
            f = !0;
          if (((n = n || {}), 'string' == typeof e[0])) e[0] = i(e[0]);
          else {
            if (!Array.isArray(e[0]))
              throw new Error(
                'First element of array must be a string, or an array and not ' +
                  JSON.stringify(e[0])
              );
            c = 0;
          }
          for (; c < e.length; c++) {
            if (e[c] === !1 || null === e[c]) {
              e[0] = !1;
              break;
            }
            if (void 0 !== e[c] && e[c] !== !0)
              if ('string' == typeof e[c])
                f && (e[c] = s(e[c])), e[0].children.push(e[c]);
              else if ('number' == typeof e[c]) e[0].children.push(e[c]);
              else if (Array.isArray(e[c])) {
                if (Array.isArray(e[c][0])) {
                  if (
                    (e[c].reverse().forEach(function (t) {
                      e.splice(c + 1, 0, t);
                    }),
                    0 !== c)
                  )
                    continue;
                  c++;
                }
                r(e[c], t, n), e[c][0] && e[0].children.push(e[c][0]);
              } else if ('function' == typeof e[c]) u = e[c];
              else {
                if ('object' != typeof e[c])
                  throw new TypeError(
                    '"' + e[c] + '" is not allowed as a value.'
                  );
                for (h in e[c])
                  e[c].hasOwnProperty(h) &&
                    null !== e[c][h] &&
                    e[c][h] !== !1 &&
                    ('style' === h && 'object' == typeof e[c][h]
                      ? (e[0].attr[h] = JSON.stringify(e[c][h], o)
                          .slice(2, -2)
                          .replace(/","/g, ';')
                          .replace(/":"/g, ':')
                          .replace(/\\"/g, "'"))
                      : (e[0].attr[h] = e[c][h]));
              }
          }
          if (e[0] !== !1) {
            l = '<' + e[0].tag;
            for (d in e[0].attr)
              e[0].attr.hasOwnProperty(d) &&
                (l += ' ' + d + '="' + a(e[0].attr[d] || '') + '"');
            (l += '>'),
              e[0].children.forEach(function (e) {
                l += e;
              }),
              (l += '</' + e[0].tag + '>'),
              (e[0] = l);
          }
          return (n[0] = e[0]), u && u(e[0]), n;
        };
      },
      function (e, t) {
        function n(e) {
          return String(e)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        }
        e.exports = n;
      },
      function (e, t, n) {
        var r = n(9),
          i = n(7);
        e.exports = (function () {
          var e = r.newEl('canvas'),
            t = null;
          return function (n) {
            null == t && (t = e.getContext('2d'));
            var r = i.canvasRatio(),
              o = n.root;
            (e.width = r * o.properties.width),
              (e.height = r * o.properties.height),
              (t.textBaseline = 'middle');
            var a = o.children.holderBg,
              s = r * a.width,
              l = r * a.height,
              h = 2,
              u = h / 2;
            (t.fillStyle = a.properties.fill),
              t.fillRect(0, 0, s, l),
              a.properties.outline &&
                ((t.strokeStyle = a.properties.outline.fill),
                (t.lineWidth = a.properties.outline.width),
                t.moveTo(u, u),
                t.lineTo(s - u, u),
                t.lineTo(s - u, l - u),
                t.lineTo(u, l - u),
                t.lineTo(u, u),
                t.moveTo(0, u),
                t.lineTo(s, l - u),
                t.moveTo(0, l - u),
                t.lineTo(s, u),
                t.stroke());
            var d = o.children.holderTextGroup;
            (t.font =
              d.properties.font.weight +
              ' ' +
              r * d.properties.font.size +
              d.properties.font.units +
              ' ' +
              d.properties.font.family +
              ', monospace'),
              (t.fillStyle = d.properties.fill);
            for (var c in d.children) {
              var f = d.children[c];
              for (var p in f.children) {
                var g = f.children[p],
                  m = r * (d.x + f.x + g.x),
                  v = r * (d.y + f.y + g.y + d.properties.leading / 2);
                t.fillText(g.properties.text, m, v);
              }
            }
            return e.toDataURL('image/png');
          };
        })();
      },
    ]);
  }),
  (function (e, t) {
    t && (Holder = e.Holder);
  })(this, 'undefined' != typeof Meteor && 'undefined' != typeof Package);

/**
 * O2System User Interface (UI) Init
 */
$(function () {
  $('.preloader').fadeOut();

  // hide scroll to top
  $('.scroll-to-top').hide();

  // check window scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // click scroll to top
  $('.scroll-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
  });

  //tooltip
  $('[data-toggle="tooltip"]').tooltip({
    animation: false,
  });

  //popover
  $('[data-toggle="popover"]').popover();
});

$('pre.line-numbers').each(function (i, pre) {
  pre.innerHTML =
    '<span class="line-number"></span>' +
    pre.innerHTML +
    '<span class="clear-both"></span>';
  var lines = pre.innerHTML.split(/\n/);
  if (lines.length > 1) {
    $.each(lines, function (number) {
      var lineNumber = pre.getElementsByTagName('span')[0];
      lineNumber.innerHTML += '<span>' + (number + 1) + '</span>';
    });
  }
});
