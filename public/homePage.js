"use strict"
//логаут
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
}

//отображение данных пользователя
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

//получение курсов текущих валют

const ratesBoard = new RatesBoard();
const func = () => {
    ApiConnector.getStocks = (response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    });
}
func();
setInterval(func, 60000);