function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function clearInputFields(inputs){
    inputs.forEach(input => {
        input.value = ''
    })
}
function contactEventControl()
{
    document.querySelector('form').addEventListener('submit',e => {
        const inputTexts = document.querySelectorAll('.text-control')
        inputTexts.forEach(textEl => {
            console.log(textEl.id+":"+textEl.value)

        })
        e.preventDefault();
        closeModal()
        clearInputFields(inputTexts)
        })
}