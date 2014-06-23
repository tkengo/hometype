#/bin/sh

BASE_DIR=$(cd $(dirname $0);pwd)

cd $BASE_DIR/dicts
curl -o all.ml http://openlab.jp/skk/skk/dic/SKK-JISYO.ML
nkf -w all.ml | sed -e "s/\// /g" | sed -e "s/  / /g" > all_w.ml

grep -E "^あ.*" all_w.ml > a.ml
grep -E "^い.*" all_w.ml > i.ml
grep -E "^う.*" all_w.ml > u.ml
grep -E "^え.*" all_w.ml > e.ml
grep -E "^お.*" all_w.ml > o.ml
grep -E "^[かきくけこ].*" all_w.ml > k.ml
grep -E "^[さしすせそ].*" all_w.ml > s.ml
grep -E "^[たちつてと].*" all_w.ml > t.ml
grep -E "^[なにぬねの].*" all_w.ml > n.ml
grep -E "^[はひふへほ].*" all_w.ml > h.ml
grep -E "^[まみむめも].*" all_w.ml > m.ml
grep -E "^[やゆよ].*" all_w.ml > y.ml
grep -E "^[らりるれろ].*" all_w.ml > r.ml
grep -E "^わ.*" all_w.ml > w.ml
grep -E "^[がぎぐげご].*" all_w.ml > g.ml
grep -E "^[ざじずぜぞ].*" all_w.ml > z.ml
grep -E "^[だぢづでど].*" all_w.ml > d.ml
grep -E "^[ばびぶべぼ].*" all_w.ml > b.ml
grep -E "^[ぱぴぷぺぽ].*" all_w.ml > p.ml

rm -f all.ml all_w.ml
