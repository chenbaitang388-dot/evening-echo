(()=>{
const mapping={"eatery":["tang_days_1","lin_days_4","xu_dinner_plain","gu_days_3","gu_days_4","zhou_days_6"],"bookshop":["shen_days_1","shen_days_3","shen_seat","shen_admit"],"market":["lin_days_2","lin_days_2b","lin_days_6","tang_days_3","zhou_days_2","zhou_balcony","gu_days_1"],"cinema":["lin_days_3","lin_movie_talk","lin_movie_difference","xu_days_2","shen_days_7"],"riverside":["zhou_days_4","zhou_days_8","gu_days_8"]};
VN.locationNames={"eatery":"校外 / 小饭馆","bookshop":"巷口 / 独立书店","market":"老街 / 午后","cinema":"社区 / 放映厅","riverside":"河畔 / 入夜"};
for(const [bg,ids] of Object.entries(mapping)){VN.assets[bg]="assets/"+bg+".png";for(const id of ids){if(!VN.nodes[id])throw Error("Missing scene "+id);VN.nodes[id].bg=bg;}}
})();
