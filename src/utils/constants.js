const handleResponse = (result) => { // Обработка ответа от сервера
  if (result.ok) {
    return result.json();
  }
  return new Error(`Ошибка: ${result.status}`);
};

const baseUrl = 'https://single.students.nomoreparties.co'; // Адрес бекенда

export { handleResponse, baseUrl };
