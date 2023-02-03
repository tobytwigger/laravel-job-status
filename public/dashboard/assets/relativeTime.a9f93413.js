import { c as commonjsGlobal } from "./dayjs.min.54da9cde.js";
var relativeTime$1 = { exports: {} };
(function(module, exports) {
  !function(r, e) {
    module.exports = e();
  }(commonjsGlobal, function() {
    return function(r, e, t) {
      r = r || {};
      var n = e.prototype, o = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function i(r2, e2, t2, o2) {
        return n.fromToBase(r2, e2, t2, o2);
      }
      t.en.relativeTime = o, n.fromToBase = function(e2, n2, i2, d2, u) {
        for (var f, a, s, l = i2.$locale().relativeTime || o, h = r.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], m = h.length, c = 0; c < m; c += 1) {
          var y = h[c];
          y.d && (f = d2 ? t(e2).diff(i2, y.d, true) : i2.diff(e2, y.d, true));
          var p = (r.rounding || Math.round)(Math.abs(f));
          if (s = f > 0, p <= y.r || !y.r) {
            p <= 1 && c > 0 && (y = h[c - 1]);
            var v = l[y.l];
            u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n2, y.l, s);
            break;
          }
        }
        if (n2)
          return a;
        var M = s ? l.future : l.past;
        return "function" == typeof M ? M(a) : M.replace("%s", a);
      }, n.to = function(r2, e2) {
        return i(r2, e2, this, true);
      }, n.from = function(r2, e2) {
        return i(r2, e2, this);
      };
      var d = function(r2) {
        return r2.$u ? t.utc() : t();
      };
      n.toNow = function(r2) {
        return this.to(d(this), r2);
      }, n.fromNow = function(r2) {
        return this.from(d(this), r2);
      };
    };
  });
})(relativeTime$1);
var relativeTime = relativeTime$1.exports;
export { relativeTime as r };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmVUaW1lLmE5ZjkzNDEzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9kYXNoYm9hcmQvbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9yZWxhdGl2ZVRpbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKHIsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6KHI9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczpyfHxzZWxmKS5kYXlqc19wbHVnaW5fcmVsYXRpdmVUaW1lPWUoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24ocixlLHQpe3I9cnx8e307dmFyIG49ZS5wcm90b3R5cGUsbz17ZnV0dXJlOlwiaW4gJXNcIixwYXN0OlwiJXMgYWdvXCIsczpcImEgZmV3IHNlY29uZHNcIixtOlwiYSBtaW51dGVcIixtbTpcIiVkIG1pbnV0ZXNcIixoOlwiYW4gaG91clwiLGhoOlwiJWQgaG91cnNcIixkOlwiYSBkYXlcIixkZDpcIiVkIGRheXNcIixNOlwiYSBtb250aFwiLE1NOlwiJWQgbW9udGhzXCIseTpcImEgeWVhclwiLHl5OlwiJWQgeWVhcnNcIn07ZnVuY3Rpb24gaShyLGUsdCxvKXtyZXR1cm4gbi5mcm9tVG9CYXNlKHIsZSx0LG8pfXQuZW4ucmVsYXRpdmVUaW1lPW8sbi5mcm9tVG9CYXNlPWZ1bmN0aW9uKGUsbixpLGQsdSl7Zm9yKHZhciBmLGEscyxsPWkuJGxvY2FsZSgpLnJlbGF0aXZlVGltZXx8byxoPXIudGhyZXNob2xkc3x8W3tsOlwic1wiLHI6NDQsZDpcInNlY29uZFwifSx7bDpcIm1cIixyOjg5fSx7bDpcIm1tXCIscjo0NCxkOlwibWludXRlXCJ9LHtsOlwiaFwiLHI6ODl9LHtsOlwiaGhcIixyOjIxLGQ6XCJob3VyXCJ9LHtsOlwiZFwiLHI6MzV9LHtsOlwiZGRcIixyOjI1LGQ6XCJkYXlcIn0se2w6XCJNXCIscjo0NX0se2w6XCJNTVwiLHI6MTAsZDpcIm1vbnRoXCJ9LHtsOlwieVwiLHI6MTd9LHtsOlwieXlcIixkOlwieWVhclwifV0sbT1oLmxlbmd0aCxjPTA7YzxtO2MrPTEpe3ZhciB5PWhbY107eS5kJiYoZj1kP3QoZSkuZGlmZihpLHkuZCwhMCk6aS5kaWZmKGUseS5kLCEwKSk7dmFyIHA9KHIucm91bmRpbmd8fE1hdGgucm91bmQpKE1hdGguYWJzKGYpKTtpZihzPWY+MCxwPD15LnJ8fCF5LnIpe3A8PTEmJmM+MCYmKHk9aFtjLTFdKTt2YXIgdj1sW3kubF07dSYmKHA9dShcIlwiK3ApKSxhPVwic3RyaW5nXCI9PXR5cGVvZiB2P3YucmVwbGFjZShcIiVkXCIscCk6dihwLG4seS5sLHMpO2JyZWFrfX1pZihuKXJldHVybiBhO3ZhciBNPXM/bC5mdXR1cmU6bC5wYXN0O3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIE0/TShhKTpNLnJlcGxhY2UoXCIlc1wiLGEpfSxuLnRvPWZ1bmN0aW9uKHIsZSl7cmV0dXJuIGkocixlLHRoaXMsITApfSxuLmZyb209ZnVuY3Rpb24ocixlKXtyZXR1cm4gaShyLGUsdGhpcyl9O3ZhciBkPWZ1bmN0aW9uKHIpe3JldHVybiByLiR1P3QudXRjKCk6dCgpfTtuLnRvTm93PWZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLnRvKGQodGhpcykscil9LG4uZnJvbU5vdz1mdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5mcm9tKGQodGhpcykscil9fX0pKTsiXSwibmFtZXMiOlsidGhpcyIsInIiLCJlIiwidCIsIm8iLCJuIiwiaSIsImQiXSwibWFwcGluZ3MiOiI7OztBQUFBLEdBQUMsU0FBUyxHQUFFLEdBQUU7QUFBc0QsV0FBZSxVQUFBLEVBQUM7QUFBQSxFQUFzSSxFQUFFQSxnQkFBTSxXQUFVO0FBQWMsV0FBTyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsVUFBRSxLQUFHLENBQUE7QUFBRyxVQUFJLElBQUUsRUFBRSxXQUFVLElBQUUsRUFBQyxRQUFPLFNBQVEsTUFBSyxVQUFTLEdBQUUsaUJBQWdCLEdBQUUsWUFBVyxJQUFHLGNBQWEsR0FBRSxXQUFVLElBQUcsWUFBVyxHQUFFLFNBQVEsSUFBRyxXQUFVLEdBQUUsV0FBVSxJQUFHLGFBQVksR0FBRSxVQUFTLElBQUcsV0FBVTtBQUFFLGVBQVMsRUFBRUMsSUFBRUMsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLGVBQU8sRUFBRSxXQUFXSCxJQUFFQyxJQUFFQyxJQUFFQyxFQUFDO0FBQUEsTUFBQztBQUFDLFFBQUUsR0FBRyxlQUFhLEdBQUUsRUFBRSxhQUFXLFNBQVNGLElBQUVHLElBQUVDLElBQUVDLElBQUUsR0FBRTtBQUFDLGlCQUFRLEdBQUUsR0FBRSxHQUFFLElBQUVELEdBQUUsUUFBUyxFQUFDLGdCQUFjLEdBQUUsSUFBRSxFQUFFLGNBQVksQ0FBQyxFQUFDLEdBQUUsS0FBSSxHQUFFLElBQUcsR0FBRSxTQUFRLEdBQUUsRUFBQyxHQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsRUFBQyxHQUFFLE1BQUssR0FBRSxJQUFHLEdBQUUsU0FBUSxHQUFFLEVBQUMsR0FBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEVBQUMsR0FBRSxNQUFLLEdBQUUsSUFBRyxHQUFFLE9BQU0sR0FBRSxFQUFDLEdBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxFQUFDLEdBQUUsTUFBSyxHQUFFLElBQUcsR0FBRSxNQUFLLEdBQUUsRUFBQyxHQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsRUFBQyxHQUFFLE1BQUssR0FBRSxJQUFHLEdBQUUsUUFBTyxHQUFFLEVBQUMsR0FBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEVBQUMsR0FBRSxNQUFLLEdBQUUsT0FBTSxDQUFDLEdBQUUsSUFBRSxFQUFFLFFBQU8sSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFHLEdBQUU7QUFBQyxjQUFJLElBQUUsRUFBRTtBQUFHLFlBQUUsTUFBSSxJQUFFQyxLQUFFLEVBQUVMLEVBQUMsRUFBRSxLQUFLSSxJQUFFLEVBQUUsR0FBRSxJQUFFLElBQUVBLEdBQUUsS0FBS0osSUFBRSxFQUFFLEdBQUUsSUFBRTtBQUFHLGNBQUksS0FBRyxFQUFFLFlBQVUsS0FBSyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUM7QUFBRSxjQUFHLElBQUUsSUFBRSxHQUFFLEtBQUcsRUFBRSxLQUFHLENBQUMsRUFBRSxHQUFFO0FBQUMsaUJBQUcsS0FBRyxJQUFFLE1BQUksSUFBRSxFQUFFLElBQUU7QUFBSSxnQkFBSSxJQUFFLEVBQUUsRUFBRTtBQUFHLGtCQUFJLElBQUUsRUFBRSxLQUFHLENBQUMsSUFBRyxJQUFFLFlBQVUsT0FBTyxJQUFFLEVBQUUsUUFBUSxNQUFLLENBQUMsSUFBRSxFQUFFLEdBQUVHLElBQUUsRUFBRSxHQUFFLENBQUM7QUFBRTtBQUFBLFVBQUs7QUFBQSxRQUFDO0FBQUMsWUFBR0E7QUFBRSxpQkFBTztBQUFFLFlBQUksSUFBRSxJQUFFLEVBQUUsU0FBTyxFQUFFO0FBQUssZUFBTSxjQUFZLE9BQU8sSUFBRSxFQUFFLENBQUMsSUFBRSxFQUFFLFFBQVEsTUFBSyxDQUFDO0FBQUEsTUFBQyxHQUFFLEVBQUUsS0FBRyxTQUFTSixJQUFFQyxJQUFFO0FBQUMsZUFBTyxFQUFFRCxJQUFFQyxJQUFFLE1BQUssSUFBRTtBQUFBLE1BQUMsR0FBRSxFQUFFLE9BQUssU0FBU0QsSUFBRUMsSUFBRTtBQUFDLGVBQU8sRUFBRUQsSUFBRUMsSUFBRSxJQUFJO0FBQUEsTUFBQztBQUFFLFVBQUksSUFBRSxTQUFTRCxJQUFFO0FBQUMsZUFBT0EsR0FBRSxLQUFHLEVBQUUsSUFBRyxJQUFHLEVBQUM7QUFBQSxNQUFFO0FBQUUsUUFBRSxRQUFNLFNBQVNBLElBQUU7QUFBQyxlQUFPLEtBQUssR0FBRyxFQUFFLElBQUksR0FBRUEsRUFBQztBQUFBLE1BQUMsR0FBRSxFQUFFLFVBQVEsU0FBU0EsSUFBRTtBQUFDLGVBQU8sS0FBSyxLQUFLLEVBQUUsSUFBSSxHQUFFQSxFQUFDO0FBQUEsTUFBQztBQUFBLElBQUM7QUFBQSxFQUFDOzs7OyJ9
