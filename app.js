var birthdateInput = document.querySelector("#input-date");
var showBtn = document.querySelector("#show-btn");
var outputResult = document.querySelector("#output");
var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// reverse the input given by user
function reverseStr(str) {
	var listOfChars = str.split("");
	var reverseListOfChars = listOfChars.reverse();
	var reversedStr = reverseListOfChars.join("");
	return reversedStr;
	// return str.split("").reverse().join("");
}

// check for palindrome
function isPalindrome(str) {
	var reverse = reverseStr(str);
	return str === reverse;
}

// convert date from number to string
function convertDateToStr(date) {
	var dateStr = { day: "", month: "", year: "" };

	if (date.day < 10) {
		dateStr.day = "0" + date.day;
	} else {
		dateStr.day = date.day.toString();
	}
	if (date.month < 10) {
		dateStr.month = "0" + date.month;
	} else {
		dateStr.month = date.month.toString();
	}
	dateStr.year = date.year.toString();

	return dateStr;
}

// function to return all date formats
function getAllDateFormats(date) {
	var dateStr = convertDateToStr(date);

	var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
	var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
	var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
	var ddmmyyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
	var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
	var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

	return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyyy, mmddyy, yymmdd];
}

// check palindrome for all formats
function checkPalindromeForAllDateFromats(date) {
	var listOfPalindromes = getAllDateFormats(date);

	var flag = false;

	for (var i = 0; i < listOfPalindromes.length; i++) {
		if (isPalindrome(listOfPalindromes[i])) {
			return true;
			break;
		}
	}
	return flag;
}

// leap year function
function isLeapYear(year) {
	if (year % 400 === 0) {
		return true;
	}
	if (year % 100 === 0) {
		return false;
	}
	if (year % 4 === 0) {
		return true;
	}
	return false;
}

function getNextDate(date) {
	var day = date.day + 1;
	var month = date.month;
	var year = date.year;

	var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// check for february
	if (month === 2) {
		// check for leap year
		if (isLeapYear(year)) {
			if (day > 29) {
				day = 1;
				month++;
			}
		} else {
			if (day > 28) {
				day = 1;
				month++;
			}
		}
	} else {
		// if days exceed max days in month then increment the month by 1 amd day =1
		if (day > daysInMonth[month - 1]) {
			day = 1;
			month++;
		}
	}

	// if month is greater than 12, increment the year
	if (month > 12) {
		month = 1;
		year++;
	}

	return {
		day: day,
		month: month,
		year: year,
	};
}

// next palindrome date and days between
function nextPalindromeDate(date) {
	var ctr = 0;
	var nextDate = getNextDate(date);

	while (1) {
		ctr++;
		var checkPalindrome = checkPalindromeForAllDateFromats(nextDate);
		if (checkPalindrome) {
			break;
		}
		nextDate = getNextDate(nextDate);
	}
	return [ctr, nextDate];
}

showBtn.addEventListener("click", checkPalindrome);

function checkPalindrome(e) {
	var bdayStr = birthdateInput.value;

	if (bdayStr !== "") {
		var listOfDate = bdayStr.split("-");

		var date = {
			day: Number(listOfDate[2]),
			month: Number(listOfDate[1]),
			year: Number(listOfDate[0]),
		};

		var isPalindrome = checkPalindromeForAllDateFromats(date);

		if (isPalindrome) {
			outputResult.innerText = "Yes! your birthday is a palindrome!! 🥳🥳";
		} else {
			var [ctr, nextDate] = nextPalindromeDate(date);

			outputResult.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} days! 😔`;
		}
	} else {
		outputResult.innerText = "Please Enter Valid Date";
	}
}
