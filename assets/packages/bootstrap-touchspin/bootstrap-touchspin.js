//Bootstrap Touchspin
!(function (t) {
  'use strict';
  function o(t, o) {
    return t + '.touchspin_' + o;
  }
  function n(n, s) {
    return t.map(n, function (t) {
      return o(t, s);
    });
  }
  var s = 0;
  t.fn.TouchSpin = function (o) {
    if ('destroy' === o)
      return void this.each(function () {
        var o = t(this),
          s = o.data();
        t(document).off(
          n(
            [
              'mouseup',
              'touchend',
              'touchcancel',
              'mousemove',
              'touchmove',
              'scroll',
              'scrollstart',
            ],
            s.spinnerid
          ).join(' ')
        );
      });
    var e = {
        min: 0,
        max: 100,
        initval: '',
        replacementval: '',
        step: 1,
        decimals: 0,
        stepinterval: 100,
        forcestepdivisibility: 'round',
        stepintervaldelay: 500,
        verticalbuttons: !1,
        verticalupclass: 'glyphicon glyphicon-chevron-up',
        verticaldownclass: 'glyphicon glyphicon-chevron-down',
        prefix: '',
        postfix: '',
        prefix_extraclass: '',
        postfix_extraclass: '',
        booster: !0,
        boostat: 10,
        maxboostedstep: !1,
        mousewheel: !0,
        buttondown_class: 'btn btn-default',
        buttonup_class: 'btn btn-default',
        buttondown_txt: '-',
        buttonup_txt: '+',
      },
      i = {
        min: 'min',
        max: 'max',
        initval: 'init-val',
        replacementval: 'replacement-val',
        step: 'step',
        decimals: 'decimals',
        stepinterval: 'step-interval',
        verticalbuttons: 'vertical-buttons',
        verticalupclass: 'vertical-up-class',
        verticaldownclass: 'vertical-down-class',
        forcestepdivisibility: 'force-step-divisibility',
        stepintervaldelay: 'step-interval-delay',
        prefix: 'prefix',
        postfix: 'postfix',
        prefix_extraclass: 'prefix-extra-class',
        postfix_extraclass: 'postfix-extra-class',
        booster: 'booster',
        boostat: 'boostat',
        maxboostedstep: 'max-boosted-step',
        mousewheel: 'mouse-wheel',
        buttondown_class: 'button-down-class',
        buttonup_class: 'button-up-class',
        buttondown_txt: 'button-down-txt',
        buttonup_txt: 'button-up-txt',
      };
    return this.each(function () {
      function a() {
        if (!E.data('alreadyinitialized')) {
          if (
            (E.data('alreadyinitialized', !0),
            (s += 1),
            E.data('spinnerid', s),
            !E.is('input'))
          )
            return void console.log('Must be an input.');
          r(),
            p(),
            w(),
            d(),
            h(),
            v(),
            x(),
            m(),
            P.input.css('display', 'block');
        }
      }
      function p() {
        '' !== M.initval && '' === E.val() && E.val(M.initval);
      }
      function u(t) {
        l(t), w();
        var o = P.input.val();
        '' !== o &&
          ((o = Number(P.input.val())), P.input.val(o.toFixed(M.decimals)));
      }
      function r() {
        M = t.extend({}, e, z, c(), o);
      }
      function c() {
        var o = {};
        return (
          t.each(i, function (t, n) {
            var s = 'bts-' + n;
            E.is('[data-' + s + ']') && (o[t] = E.data(s));
          }),
          o
        );
      }
      function l(o) {
        (M = t.extend({}, M, o)),
          o.postfix &&
            E.parent().find('.bootstrap-touchspin-postfix').text(o.postfix),
          o.prefix &&
            E.parent().find('.bootstrap-touchspin-prefix').text(o.prefix);
      }
      function d() {
        var t = E.val(),
          o = E.parent();
        '' !== t && (t = Number(t).toFixed(M.decimals)),
          E.data('initvalue', t).val(t),
          E.addClass('form-control'),
          o.hasClass('input-group') ? f(o) : b();
      }
      function f(o) {
        o.addClass('bootstrap-touchspin');
        var n,
          s,
          e = E.prev(),
          i = E.next(),
          a =
            '<span class="input-group-addon bootstrap-touchspin-prefix">' +
            M.prefix +
            '</span>',
          p =
            '<span class="input-group-addon bootstrap-touchspin-postfix">' +
            M.postfix +
            '</span>';
        e.hasClass('input-group-btn')
          ? ((n =
              '<button class="' +
              M.buttondown_class +
              ' bootstrap-touchspin-down" type="button">' +
              M.buttondown_txt +
              '</button>'),
            e.append(n))
          : ((n =
              '<span class="input-group-btn"><button class="' +
              M.buttondown_class +
              ' bootstrap-touchspin-down" type="button">' +
              M.buttondown_txt +
              '</button></span>'),
            t(n).insertBefore(E)),
          i.hasClass('input-group-btn')
            ? ((s =
                '<button class="' +
                M.buttonup_class +
                ' bootstrap-touchspin-up" type="button">' +
                M.buttonup_txt +
                '</button>'),
              i.prepend(s))
            : ((s =
                '<span class="input-group-btn"><button class="' +
                M.buttonup_class +
                ' bootstrap-touchspin-up" type="button">' +
                M.buttonup_txt +
                '</button></span>'),
              t(s).insertAfter(E)),
          t(a).insertBefore(E),
          t(p).insertAfter(E),
          (N = o);
      }
      function b() {
        var o;
        (o = M.verticalbuttons
          ? '<div class="input-group bootstrap-touchspin"><span class="input-group-addon bootstrap-touchspin-prefix">' +
            M.prefix +
            '</span><span class="input-group-addon bootstrap-touchspin-postfix">' +
            M.postfix +
            '</span><span class="input-group-btn-vertical"><button class="' +
            M.buttondown_class +
            ' bootstrap-touchspin-up" type="button"><i class="' +
            M.verticalupclass +
            '"></i></button><button class="' +
            M.buttonup_class +
            ' bootstrap-touchspin-down" type="button"><i class="' +
            M.verticaldownclass +
            '"></i></button></span></div>'
          : '<div class="input-group bootstrap-touchspin"><span class="input-group-btn"><button class="' +
            M.buttondown_class +
            ' bootstrap-touchspin-down" type="button">' +
            M.buttondown_txt +
            '</button></span><span class="input-group-addon bootstrap-touchspin-prefix">' +
            M.prefix +
            '</span><span class="input-group-addon bootstrap-touchspin-postfix">' +
            M.postfix +
            '</span><span class="input-group-btn"><button class="' +
            M.buttonup_class +
            ' bootstrap-touchspin-up" type="button">' +
            M.buttonup_txt +
            '</button></span></div>'),
          (N = t(o).insertBefore(E)),
          t('.bootstrap-touchspin-prefix', N).after(E),
          E.hasClass('input-sm')
            ? N.addClass('input-group-sm')
            : E.hasClass('input-lg') && N.addClass('input-group-lg');
      }
      function h() {
        P = {
          down: t('.bootstrap-touchspin-down', N),
          up: t('.bootstrap-touchspin-up', N),
          input: t('input', N),
          prefix: t('.bootstrap-touchspin-prefix', N).addClass(
            M.prefix_extraclass
          ),
          postfix: t('.bootstrap-touchspin-postfix', N).addClass(
            M.postfix_extraclass
          ),
        };
      }
      function v() {
        '' === M.prefix && P.prefix.hide(),
          '' === M.postfix && P.postfix.hide();
      }
      function x() {
        E.on('keydown', function (t) {
          var o = t.keyCode || t.which;
          38 === o
            ? ('up' !== O && (_(), k()), t.preventDefault())
            : 40 === o && ('down' !== O && (C(), D()), t.preventDefault());
        }),
          E.on('keyup', function (t) {
            var o = t.keyCode || t.which;
            38 === o ? F() : 40 === o && F();
          }),
          E.on('blur', function () {
            w();
          }),
          P.down.on('keydown', function (t) {
            var o = t.keyCode || t.which;
            (32 === o || 13 === o) &&
              ('down' !== O && (C(), D()), t.preventDefault());
          }),
          P.down.on('keyup', function (t) {
            var o = t.keyCode || t.which;
            (32 === o || 13 === o) && F();
          }),
          P.up.on('keydown', function (t) {
            var o = t.keyCode || t.which;
            (32 === o || 13 === o) &&
              ('up' !== O && (_(), k()), t.preventDefault());
          }),
          P.up.on('keyup', function (t) {
            var o = t.keyCode || t.which;
            (32 === o || 13 === o) && F();
          }),
          P.down.on('mousedown.touchspin', function (t) {
            P.down.off('touchstart.touchspin'),
              E.is(':disabled') ||
                (C(), D(), t.preventDefault(), t.stopPropagation());
          }),
          P.down.on('touchstart.touchspin', function (t) {
            P.down.off('mousedown.touchspin'),
              E.is(':disabled') ||
                (C(), D(), t.preventDefault(), t.stopPropagation());
          }),
          P.up.on('mousedown.touchspin', function (t) {
            P.up.off('touchstart.touchspin'),
              E.is(':disabled') ||
                (_(), k(), t.preventDefault(), t.stopPropagation());
          }),
          P.up.on('touchstart.touchspin', function (t) {
            P.up.off('mousedown.touchspin'),
              E.is(':disabled') ||
                (_(), k(), t.preventDefault(), t.stopPropagation());
          }),
          P.up.on('mouseout touchleave touchend touchcancel', function (t) {
            O && (t.stopPropagation(), F());
          }),
          P.down.on('mouseout touchleave touchend touchcancel', function (t) {
            O && (t.stopPropagation(), F());
          }),
          P.down.on('mousemove touchmove', function (t) {
            O && (t.stopPropagation(), t.preventDefault());
          }),
          P.up.on('mousemove touchmove', function (t) {
            O && (t.stopPropagation(), t.preventDefault());
          }),
          t(document).on(
            n(['mouseup', 'touchend', 'touchcancel'], s).join(' '),
            function (t) {
              O && (t.preventDefault(), F());
            }
          ),
          t(document).on(
            n(['mousemove', 'touchmove', 'scroll', 'scrollstart'], s).join(' '),
            function (t) {
              O && (t.preventDefault(), F());
            }
          ),
          E.on('mousewheel DOMMouseScroll', function (t) {
            if (M.mousewheel && E.is(':focus')) {
              var o =
                t.originalEvent.wheelDelta ||
                -t.originalEvent.deltaY ||
                -t.originalEvent.detail;
              t.stopPropagation(), t.preventDefault(), 0 > o ? C() : _();
            }
          });
      }
      function m() {
        E.on('touchspin.uponce', function () {
          F(), _();
        }),
          E.on('touchspin.downonce', function () {
            F(), C();
          }),
          E.on('touchspin.startupspin', function () {
            k();
          }),
          E.on('touchspin.startdownspin', function () {
            D();
          }),
          E.on('touchspin.stopspin', function () {
            F();
          }),
          E.on('touchspin.updatesettings', function (t, o) {
            u(o);
          });
      }
      function g(t) {
        switch (M.forcestepdivisibility) {
          case 'round':
            return (Math.round(t / M.step) * M.step).toFixed(M.decimals);
          case 'floor':
            return (Math.floor(t / M.step) * M.step).toFixed(M.decimals);
          case 'ceil':
            return (Math.ceil(t / M.step) * M.step).toFixed(M.decimals);
          default:
            return t;
        }
      }
      function w() {
        var t, o, n;
        return (
          (t = E.val()),
          '' === t
            ? void (
                '' !== M.replacementval &&
                (E.val(M.replacementval), E.trigger('change'))
              )
            : void (
                (M.decimals > 0 && '.' === t) ||
                ((o = parseFloat(t)),
                isNaN(o) &&
                  (o = '' !== M.replacementval ? M.replacementval : 0),
                (n = o),
                o.toString() !== t && (n = o),
                o < M.min && (n = M.min),
                o > M.max && (n = M.max),
                (n = g(n)),
                Number(t).toString() !== n.toString() &&
                  (E.val(n), E.trigger('change')))
              )
        );
      }
      function y() {
        if (M.booster) {
          var t = Math.pow(2, Math.floor(A / M.boostat)) * M.step;
          return (
            M.maxboostedstep &&
              t > M.maxboostedstep &&
              ((t = M.maxboostedstep), (S = Math.round(S / t) * t)),
            Math.max(M.step, t)
          );
        }
        return M.step;
      }
      function _() {
        w(), (S = parseFloat(P.input.val())), isNaN(S) && (S = 0);
        var t = S,
          o = y();
        (S += o),
          S > M.max && ((S = M.max), E.trigger('touchspin.on.max'), F()),
          P.input.val(Number(S).toFixed(M.decimals)),
          t !== S && E.trigger('change');
      }
      function C() {
        w(), (S = parseFloat(P.input.val())), isNaN(S) && (S = 0);
        var t = S,
          o = y();
        (S -= o),
          S < M.min && ((S = M.min), E.trigger('touchspin.on.min'), F()),
          P.input.val(S.toFixed(M.decimals)),
          t !== S && E.trigger('change');
      }
      function D() {
        F(),
          (A = 0),
          (O = 'down'),
          E.trigger('touchspin.on.startspin'),
          E.trigger('touchspin.on.startdownspin'),
          (I = setTimeout(function () {
            T = setInterval(function () {
              A++, C();
            }, M.stepinterval);
          }, M.stepintervaldelay));
      }
      function k() {
        F(),
          (A = 0),
          (O = 'up'),
          E.trigger('touchspin.on.startspin'),
          E.trigger('touchspin.on.startupspin'),
          (B = setTimeout(function () {
            j = setInterval(function () {
              A++, _();
            }, M.stepinterval);
          }, M.stepintervaldelay));
      }
      function F() {
        switch (
          (clearTimeout(I),
          clearTimeout(B),
          clearInterval(T),
          clearInterval(j),
          O)
        ) {
          case 'up':
            E.trigger('touchspin.on.stopupspin'),
              E.trigger('touchspin.on.stopspin');
            break;
          case 'down':
            E.trigger('touchspin.on.stopdownspin'),
              E.trigger('touchspin.on.stopspin');
        }
        (A = 0), (O = !1);
      }
      var M,
        N,
        P,
        S,
        T,
        j,
        I,
        B,
        E = t(this),
        z = E.data(),
        A = 0,
        O = !1;
      a();
    });
  };
})(jQuery);
