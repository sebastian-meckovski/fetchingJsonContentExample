export const updateData = (data) => {
    header.textContent = data.title;
    item.textContent = data.greeting;
    myButton.textContent = data.changeLanguageButton;
  };