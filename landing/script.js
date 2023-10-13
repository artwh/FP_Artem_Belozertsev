document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contactForm");
    const submitButton = document.getElementById("button");


    loadFormData();

    submitButton.addEventListener("click", function (event) {
        event.preventDefault();

        // Проверка, были ли данные уже отправлены
        const cookieExists = getCookie("formSubmitted");

        if (cookieExists) {
            // Если данные уже были отправлены, выводим сообщение о обработке
            alert(`${cookieExists}, ваше обращение обрабатывается!`);
        } else {
            const formData = {
                firstName: contactForm.firstName.value,
                lastName: contactForm.lastName.value,
                email: contactForm.email.value,
                phone: contactForm.phone.value,
                message: contactForm.message.value,
            };


            const invalidFields = getInvalidFields(formData);

            if (invalidFields.length === 0) {
                // Отображение сообщения об успешной отправке
                alert(`${formData.firstName} ${formData.lastName}, спасибо за обращение!`);

                // Установка флага в cookies
                setCookie("formSubmitted", `${formData.firstName} ${formData.lastName}, ваше обращение обрабатывается!`, 365);

                // Очистка данных из localStorage после успешной отправки
                saveFormData(formData);

                // Явный сброс формы
                contactForm.reset();

                // Отправка формы
                contactForm.submit();

                // Выход из функции после отправки формы
                return;
            } else {
                alert("Поля " + invalidFields.join(", ") + " заполнены неверно, пожалуйста, исправьте.");
            }
        }
    });

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    function getInvalidFields(formData) {
        const invalidFields = [];

        const firstnamePattern = /^[A-Z][a-z]*$/;
        if (!firstnamePattern.test(formData.firstName)) {
            invalidFields.push("First Name");
        }

        const lastnamePattern = /^[A-Z][a-z]*$/;
        if (!lastnamePattern.test(formData.lastName)) {
            invalidFields.push("Last Name");
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(formData.email)) {
            invalidFields.push("Email");
        }

        if (formData.phone.trim() !== "") {
            const phonePattern = /\+[0-9]\(\d{3}\)\d{2}-\d{2}-\d{3}/;
            if (!phonePattern.test(formData.phone)) {
                invalidFields.push("Phone");
            }
        }
        if (formData.message.trim() === "") {
            invalidFields.push("Message");
        }

        return invalidFields;
    }


    function saveFormData(formData) {
        localStorage.setItem("formData", JSON.stringify(formData));
    }

    function loadFormData() {
        const savedFormData = localStorage.getItem("formData");
        if (savedFormData) {
            const formData = JSON.parse(savedFormData);
            contactForm.firstName.value = formData.firstName;
            contactForm.lastName.value = formData.lastName;
            contactForm.email.value = formData.email;
            contactForm.phone.value = formData.phone;
            contactForm.message.value = formData.message;
        }
    }
});


const openButton = document.getElementById("openModal");



const modal = document.getElementById("myModal");
const closeButton = document.querySelector(".close");


openButton.addEventListener("click", function () {
    modal.style.display = "block";
});

closeButton.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});