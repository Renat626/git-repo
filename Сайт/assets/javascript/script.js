function answer() {
	var ans = $("#inp").val();
	if (ans == "Корова из-за угла выглядывает." || ans == "Корова из-за угла выглядывает" || ans == "Корова из за угла выглядывает." || ans == "Корова из за угла выглядывает" || ans == "корова из-за угла выглядывает" || ans == "корова из за угла выглядывает" || ans == "корова из-за угла выглядывает." || ans == "корова из за угла выглядывает.") {
		$("#quest").text("Ответ правильный!");
		$("body").css("background-color", "royalblue");
	}
	else {
		$("#quest").text("Ответ неправильный!"); 
		$("body").css("background-color", "red");
	}
	$("#inp").val("");
}
$('html').keydown(function(key) {if (key.which == 13) {answer()}});