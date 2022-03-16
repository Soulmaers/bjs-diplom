"use strict"

const logoutButton = new LogoutButton();
logoutButton.action = (logout) => {
    ApiConnector.logout(response => {
        location.reload();

    })


}