// Account Balance
let accountBalance = 5500;

// HTMl page switching
document.getElementById('blog-btn').addEventListener('click', function () {
    window.location.href = './FAQ.html';
});

// Toggle between Donation & History sections
document.getElementById('history-btn').addEventListener('click', function () {
    document.getElementById('card-section').classList.add('hidden')
    document.getElementById('history-section').classList.remove('hidden')
    this.classList.remove('bg-transparent');
    this.classList.add('bg-primary')
    document.getElementById('donation-btn').classList.remove('bg-primary')
    document.getElementById('donation-btn').classList.add('bg-transparent')
});
document.getElementById('donation-btn').addEventListener('click', function () {
    document.getElementById('history-section').classList.add('hidden');
    document.getElementById('card-section').classList.remove('hidden');
    this.classList.remove('bg-transparent')
    this.classList.add('bg-primary')
    document.getElementById('history-btn').classList.remove('bg-primary')
    document.getElementById('history-btn').classList.add('bg-transparent')
});

document.querySelectorAll('.donate-now-btn').forEach(button => {
    button.addEventListener('click', function () {
        const blog = this.closest('.blog-section');
        const inputField = blog.querySelector('.donation-input');
        const donationAmount = parseFloat(inputField.value);
        const currentDonationE1 = blog.querySelector('.current-donation');
        const donationTitle = blog.querySelector('h1').innerText;

        if (isNaN(donationAmount) || donationAmount <= 0) {
            alert('Please enter a valid donation amount');
            return;
        }

        if (donationAmount > accountBalance) {
            alert('You do not have enough balance for this donation');
            return;
        }

        // Deduct from account balance
        accountBalance -= donationAmount;
        document.getElementById('balance').innerText = (accountBalance);

        // Update current donation amount on the card
        const currentDonation = parseFloat(currentDonationE1.innerText) || 0;
        currentDonationE1.innerText = (currentDonation + donationAmount);
        
        // Add donation history
        addDonationHistory (donationAmount, donationTitle);

        // clear input field after donation
        inputField.value= '';

        function addDonationHistory (amount, title) {
            const historyList = document.getElementById('history-list');
            const now = new Date();
            const historyItem = document.createElement('div');
            historyItem.classList.add('border-2', 'rounded-lg', 'my-8', 'p-5')
            historyItem.innerHTML = `<strong> ${amount} Donated to ${title}</strong><br><span>Date: ${now.toLocaleString()}</span>`
            historyList.appendChild(historyItem);
        }
    });
});