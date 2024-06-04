const childData = [
    { "id": 1, "childname": "Child 1" },
    { "id": 2, "childname": "Child 2" },
    { "id": 3, "childname": "Child 3" },
    { "id": 4, "childname": "Child 4" },
    { "id": 5, "childname": "Child 5" },
    { "id": 6, "childname": "Child 6" },
    { "id": 7, "childname": "Child 7" },
    { "id": 8, "childname": "Child 8" },
];

const calculatorContainer = document.querySelector(".calculatorContainer");

childData.forEach((child) => {
    const childDiv = document.createElement("div");
    childDiv.classList.add("childCnt");
    childDiv.innerHTML = `
        <h4>${child.childname}</h4>
        <label for="milk-${child.id}">Fluid Milk</label>
        <select id="milk-${child.id}" class="milk">
            <option value="0">None</option>
            <option value="0.125">1/8</option>
            <option value="0.25">1/4</option>
            <option value="0.5">1/2</option>
            <option value="0.75">3/4</option>
            <option value="1">1</option>
            <option value="1.5">1 1/2</option>
            <option value="2">2</option>
        </select>
        <label for="fruit-${child.id}">Fruits</label>
        <select id="fruit-${child.id}" class="fruit">
            <option value="0">None</option>
            <option value="0.125">1/8</option>
            <option value="0.25">1/4</option>
            <option value="0.5">1/2</option>
            <option value="0.75">3/4</option>
            <option value="1">1</option>
            <option value="1.5">1 1/2</option>
            <option value="2">2</option>
        </select>
        <label for="vegetable-${child.id}">Vegetables</label>
        <select id="vegetable-${child.id}" class="vegetable">
            <option value="0">None</option>
            <option value="0.125">1/8</option>
            <option value="0.25">1/4</option>
            <option value="0.5">1/2</option>
            <option value="0.75">3/4</option>
            <option value="1">1</option>
            <option value="1.5">1 1/2</option>
            <option value="2">2</option>
        </select>
        <label for="grain-${child.id}">Grains</label>
        <select id="grain-${child.id}" class="grain">
            <option value="0">None</option>
            <option value="0.125">1/8</option>
            <option value="0.25">1/4</option>
            <option value="0.5">1/2</option>
            <option value="0.75">3/4</option>
            <option value="1">1</option>
            <option value="1.5">1 1/2</option>
            <option value="2">2</option>
        </select>
        <label for="meat-${child.id}">Meat and/or Alt</label>
        <select id="meat-${child.id}" class="meat">
            <option value="0">None</option>
            <option value="0.125">1/8</option>
            <option value="0.25">1/4</option>
            <option value="0.5">1/2</option>
            <option value="0.75">3/4</option>
            <option value="1">1</option>
            <option value="1.5">1 1/2</option>
            <option value="2">2</option>
        </select>
    `;
    calculatorContainer.appendChild(childDiv);
});

const resetButton = document.getElementById("resetButton");

resetButton.addEventListener("click", () => {
    document.querySelectorAll("select").forEach(select => {
        select.value = "0";
    });
    updateTotals();
});

const decimalToFraction = (decimal) => {
    if (decimal === 0) return "None";
    
    const tolerance = 1.0E-6;
    let h1 = 1, h2 = 0, k1 = 0, k2 = 1, b = decimal;
    do {
        const a = Math.floor(b);
        const aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        const auxk = k1;
        k1 = a * k1 + k2;
        k2 = auxk;
        b = 1 / (b - a);
    } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

    if (decimal >= 1) {
        const wholeNumber = Math.floor(decimal);
        const fraction = decimalToFraction(decimal - wholeNumber);
        return fraction === "None" ? `${wholeNumber}` : `${wholeNumber} ${fraction}`;
    }

    return `${h1}/${k1}`;
};

const updateTotals = () => {
    const totals = {
        milk: 0,
        fruit: 0,
        vegetable: 0,
        grain: 0,
        meat: 0,
    };

    document.querySelectorAll(".milk").forEach(select => {
        totals.milk += parseFloat(select.value);
    });

    document.querySelectorAll(".fruit").forEach(select => {
        totals.fruit += parseFloat(select.value);
    });

    document.querySelectorAll(".vegetable").forEach(select => {
        totals.vegetable += parseFloat(select.value);
    });

    document.querySelectorAll(".grain").forEach(select => {
        totals.grain += parseFloat(select.value);
    });

    document.querySelectorAll(".meat").forEach(select => {
        totals.meat += parseFloat(select.value);
    });

    document.querySelector(".totalMilk").textContent = totals.milk === 0 ? "None" : `${decimalToFraction(totals.milk)} (${totals.milk.toFixed(2)})`;
    document.querySelector(".totalFruits").textContent = totals.fruit === 0 ? "None" : `${decimalToFraction(totals.fruit)} (${totals.fruit.toFixed(2)})`;
    document.querySelector(".totalVegetables").textContent = totals.vegetable === 0 ? "None" : `${decimalToFraction(totals.vegetable)} (${totals.vegetable.toFixed(2)})`;
    document.querySelector(".totalGrains").textContent = totals.grain === 0 ? "None" : `${decimalToFraction(totals.grain)} (${totals.grain.toFixed(2)})`;
    document.querySelector(".totalMeat").textContent = totals.meat === 0 ? "None" : `${decimalToFraction(totals.meat)} (${totals.meat.toFixed(2)})`;
};

document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", updateTotals);
});

updateTotals(); // Initial calculation
