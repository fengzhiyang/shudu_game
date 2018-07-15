import Grid from "./ui/Grid";
import Popup from "./ui/Popup";

function main() {
    const $container = $("#container");
    const $popup = $("#popup");

    const grid = new Grid($container);
    grid.bindPopup(new Popup($popup));
    grid.rebuild();

    $("#check").on("click", () => {
        if (grid.check()) {
            alert("成功");
        }
    });
    $("#reset").on("click", () => grid.reset());
    $("#clear").on("click", () => grid.clear());
    $("#rebuild").on("click", () => grid.rebuild());

    $(window).on("resize", () => grid.layout());
}

main();