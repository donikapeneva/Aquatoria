(() => {

    const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var $addAdminForm = $('#add-admin-form'),
        $addAdminButton = $('#add-admin-button'),
        $addAdminErrorContainer = $('#error-add-admin-container'),
        adminList = document.getElementById('admin-list'),
        adminListChildren = adminList.children,
        $saveAdminsBtn = $('#save-admins-button');


    //TODO: ajax sending the array of new admins
    $saveAdminsBtn.unbind('click');
    $saveAdminsBtn.on('click', function () {
        console.log('want to save addmins');


        let emails = adminListData.map(function (admin) {
            return admin.email;
        });
        console.log(emails);

        $.ajax({
            url: '/manageAdmins',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(emails)
        })
            .done((res) => {
                console.log('done');
            })
            .fail((err) => {
                console.log('fail');
                console.log(err);

                // //TODO : do parser ?
                // let errorObj = JSON.parse(err.responseText);
                // displayValidationErrors(errorObj.message, $addAdminErrorContainer);
            });


        // window.location = res.redirectRoute;

    });
    console.log('admin data');
    //if it crashes again, look in profile.pug -> JSON.stringify... -> and this here, if it is string, or object
    console.log(adminListData);


    listAdmin();
    evalAdminList();


    function listAdmin() {
        for (let i = 0; i < adminListData.length; i++) {

            console.log(adminListData[i]);
            console.log(adminListData[i]);

            let adminLi, adminVal, adminRemoveBtn;

            adminLi = document.createElement('li');
            //set attribute

            adminVal = document.createTextNode(adminListData[i].fullName);
            adminRemoveBtn = document.createElement('button');
            adminRemoveBtn.innerHTML = 'X';


            let indexOfChild = adminList.childNodes.length;
            console.log(indexOfChild);


            adminLi.appendChild(adminVal);
            adminLi.appendChild(adminRemoveBtn);
            adminList.appendChild(adminLi);
        }
    }


    //BIND CLICK EVENTS TO ELEMENTS
    function evalAdminList() {
        let removeBtn;
        for (let i = 0; i < adminListChildren.length; i++) {
            console.log('element ' + i);
            console.log(adminListData[i]);
            //ADD CLICK EVENT TO DELETE BUTTON
            removeBtn = adminListChildren[i].getElementsByTagName('button')[0];
            removeBtn.onclick = removeAdmin.bind(this, i);
        }
    }

    function removeAdmin(i) {
        adminList.children[i].remove();
        console.log(adminListData.splice(i, 1));
        evalAdminList();
    }

    $addAdminButton.unbind('click');
    $addAdminButton.on('click', function () {
        console.log('add admin button clicked');

        resetErrorContainer();

        let isFormValid = validateAddAdminForm();

        if (isFormValid) {
            let email = $addAdminForm.find("input[name='email']").val();

            for (let i = 0; i < adminListData.length; i++) {
                if (adminListData[i].email === email) {

                    console.log('the user is in already');

                    displayValidationErrors('This user is already admin', $addAdminErrorContainer);
                    return;
                } else {
                    console.log('adding the user');
                    //TODO: checks if user exists -> controller level or use just caching

                    let adminLi, adminVal, adminRemoveBtn;

                    adminLi = document.createElement('li');
                    //TODO user.fullName ?
                    adminVal = document.createTextNode(email);
                    adminRemoveBtn = document.createElement('button');
                    adminRemoveBtn.innerHTML = 'X';


                    adminLi.appendChild(adminVal);
                    adminLi.appendChild(adminRemoveBtn);
                    adminList.appendChild(adminLi);
                    //TODO: user.fullName, user.email ?
                    adminListData.push({fullName: '', email: email});
                    $addAdminForm.find("input[name='email']").val('');
                }
            }

        }

    });

    function validateAddAdminForm() {

        resetErrorContainer();

        let errorMessage = '',
            isFormValid = false,
            input = $addAdminForm.find("input[name='email']");

        if (input.val().length !== 0) {
            if (!validator.validateInputByPattern(input, EMAIL_PATTERN)) {
                errorMessage = 'The email is not valid';
                displayValidationErrors(errorMessage, $addAdminErrorContainer);
                return;
            } else {
                isFormValid = true;
            }
        } else {
            errorMessage = 'Please, enter an email';
            displayValidationErrors(errorMessage, $addAdminErrorContainer);
            return;
        }

        return isFormValid;
    }

    function displayValidationErrors(message, container) {
        container.show();
        console.log(container);
        container.append(
            $(document.createElement('p')).text(message)
        );
    }

    function resetErrorContainer() {
        $addAdminErrorContainer.find('p').html('');
        $addAdminErrorContainer.find('p').remove();
    }


})();