function answer() {
	var ans = $("#inp").val();
	if (ans == "Корова из-за угла выглядывает." || ans == "Корова из-за угла выглядывает" || ans == "Корова из за угла выглядывает." || ans == "Корова из за угла выглядывает" || ans == "корова из-за угла выглядывает" || ans == "корова из за угла выглядывает" || ans == "корова из-за угла выглядывает." || ans == "корова из за угла выглядывает.") {
		$("#quest").text("Ответ правильный!");
		$("body").animate({
			backgroundColor: "royalblue"
		}, 500);
	}
	else {
		$("#quest").text("Ответ неправильный!"); 
		$("body").animate({
			backgroundColor: "red"
		}, 500);
	}
	$("#inp").val("");
}
$('html').keydown(function(key) {if (key.which == 13) {answer()}});