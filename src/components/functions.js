const capitalizeFirstLetter = function(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const roundMoney = (value) => {
	return Math.round(value * 100) / 100;
}

module.exports = {
	capitalizeFirstLetter, roundMoney
}