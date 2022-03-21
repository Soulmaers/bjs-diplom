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
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        };
    });
}
func();
setInterval(func, 60000, ratesBoard);

//операция с деньгами-пополнение баланса
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        };
        const message = response.error || 'Счет пополнен';
        moneyManager.setMessage(response.success, message);
    });
}
// операция с деньгами-конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        };
        const message = response.error || 'Конвертация выполнена';
        moneyManager.setMessage(response.success, message);
    });
};
// операция с деньгами-перевод валюты

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        };
        const message = response.error || 'Перевод выполнен';
        moneyManager.setMessage(response.success, message);
    });

};

//работа с избранным-начальный список избранного
const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});
//работа с избранным-добавления пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
        const message = response.error || 'Пользователь добавлен';
        favoritesWidget.setMessage(response.success, message);
    });
};
//работа с избранным-удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
        const message = response.error || 'Пользователь удалён';
        moneyManager.setMessage(response.success, message);
    });
}