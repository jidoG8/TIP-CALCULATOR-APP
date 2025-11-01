/**
 * @date 2025/10/30
 * @code Frontend Mentor | Tip calculator app
 * @version 1.0
 * @author: Ojja
 */

// DOM REFERENCES
const totalTipPerPerson = document.getElementById(
	"tip-amount__total-per-person"
);
const billDue = document.getElementById("bill__input");
const clients = document.getElementById("num-people__input");
const tipPerPerson = document.getElementById("tip-amount__per-person");

// Validate inputs when button is pressed
const billErrorElement = document.querySelector(".bill__input-error");
const clientsErrorElement = document.querySelector(".num-people__input-error");

// Set default values on page load
if (tipPerPerson) tipPerPerson.textContent = "$0.00";
if (totalTipPerPerson) totalTipPerPerson.textContent = "$0.00";

// tips percentages
const tipPercentages = [
	document.getElementById("tip-percentage__btn--5"),
	document.getElementById("tip-percentage__btn--10"),
	document.getElementById("tip-percentage__btn--15"),
	document.getElementById("tip-percentage__btn--25"),
	document.getElementById("tip-percentage__btn--50"),
	document.getElementById("tip-percentage__custom-input"),
];

/* _____________CALCUALTE TIP AS PER PERCENTAGES_____________ */
const calculateTips = (tipButton) => {
	// Clear all highlights first
	tipPercentages.forEach((btn) => {
		if (btn) btn.style.backgroundColor = "";
	});

	// Highlight selected button
	tipButton.style.backgroundColor = "hsl(172, 67%, 45%)";

	const toggleError = (input, errorElement, show) => {
		errorElement.style.display = show ? "block" : "none";
		errorElement.textContent = show ? "Can't be zero" : "";
		input.style.border = show ? "2px solid var(--errColor)" : "";
	};

	if (!billDue.value || parseFloat(billDue.value) === 0) {
		toggleError(billDue, billErrorElement, true);
	}
	if (!clients.value || parseFloat(clients.value) === 0) {
		toggleError(clients, clientsErrorElement, true);
	}

	// Check if all inputs are filled and valid
	if (
		!billDue.value ||
		!clients.value ||
		!tipButton.value ||
		parseFloat(billDue.value) === 0 ||
		parseFloat(clients.value) === 0
	) {
		return;
	}

	const customers = parseFloat(clients.value);
	const bill = parseFloat(billDue.value);

	// Handle different input types
	let tipPercentage;
	if (tipButton.type === "number") {
		// Custom input: value is already a number (e.g., "15")
		tipPercentage = parseFloat(tipButton.value) / 100;
	} else {
		// Percentage buttons: value has "%" symbol (e.g., "15%")
		tipPercentage = parseFloat(tipButton.value.replace("%", "")) / 100;
	}

	// Computation of Tip
	const tipAmount = (bill * tipPercentage) / customers;
	const totalAmount = bill / customers + tipAmount;

	// Display computed Tip
	tipPerPerson.textContent = `$${tipAmount.toFixed(2)}`;
	totalTipPerPerson.textContent = `$${totalAmount.toFixed(2)}`;

	// Enable reset button after calculation
	if (resetButton) resetButton.disabled = false;
};

/* _____________CALCUALTIONS OF TIPS_____________ */
tipPercentages.forEach((tip) => {
	if (tip) {
		if (tip.type !== "number") {
			tip.addEventListener("click", (e) => {
				e.preventDefault();
				calculateTips(tip);
			});
		}

		if (tip.type === "number") {
			tip.addEventListener("input", () => calculateTips(tip));
		}
	}
});

/* _____________RESET FUNCTIONALITY_____________ */
const resetButton = document.querySelector(".tip-amount__reset");
const customInput = document.getElementById("tip-percentage__custom-input");
if (resetButton) {
	resetButton.disabled = true; // Disable on page load

	// RESET LOGIC
	resetButton.addEventListener("click", () => {
		billDue.value = "";
		clients.value = "";

		customInput.value = "";
		tipPerPerson.textContent = `$0.00`;
		totalTipPerPerson.textContent = `$0.00`;
		tipPercentages.forEach((btn) => {
			if (btn) btn.style.backgroundColor = "";
		});

		// Disable reset button after reset
		resetButton.disabled = true;
	});

	/*___________USER INPUT VALIDATION___________*/

	const toggleError = (input, errorElement, show) => {
		errorElement.style.display = show ? "block" : "none";
		errorElement.textContent = show ? "Can't be zero" : "";
		input.style.border = show ? "2px solid var(--errColor)" : "";

		// remove button & custom input highlight
		tipPercentages.forEach((btn) => {
			if (btn) btn.style.backgroundColor = "";
		});

		customInput.value = "";
	};

	const validateInput = (input, errorElement) => {
		const isZero = parseFloat(input.value) === 0;
		toggleError(input, errorElement, isZero);
		resetButton.disabled = !(billDue.value && clients.value && !isZero);
	};

	billDue.addEventListener("input", () =>
		validateInput(billDue, billErrorElement)
	);
	clients.addEventListener("input", () =>
		validateInput(clients, clientsErrorElement)
	);
}
