function answer() {
	var ans = $("#inp").val(), ch = 0;
	var que = ["Корова из-за угла выглядывает.", "Корова из-за угла выглядывает", "Корова из за угла выглядывает.", "Корова из за угла выглядывает", "корова из-за угла выглядывает.", "корова из-за угла выглядывает", "корова из за угла выглядывает.", "корова из за угла выглядывает",];
	for (var i = 0; i < 8; i++) {
		if (ans == que[i]) {
			$("#quest").text("Ответ правильный!");
			$("body").animate({backgroundColor: "royalblue"}, 500);
			break;
		}
		else {ch++}
	}
	if (ch == 8) {
		$("#quest").text("Ответ неправильный!");
		$("body").animate({backgroundColor: "red"}, 500);
	}
	$("#inp").val("");
}
$('html').keydown(function(key) {if (key.which == 13) {answer()}});