const handleResponse = (result) => {
  if (result.ok) {
    return result.json();
  }
  return new Error(`Ошибка: ${result.status}`);
};

const baseUrl = 'https://single.students.nomoreparties.co';

export { handleResponse, baseUrl };
