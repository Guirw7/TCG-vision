import "./styles.scss";

export default function Icon() {
  
  const clickHandler = () => {
    const iconElement: any = document.querySelector("#header__icon");
    const iconClass = iconElement.classList;
    console.log(iconClass);
    if (iconClass.value === "header__icon-closed") {
      iconClass.value = "header__icon-opened";
    }
    else {
      iconClass.value = "header__icon-closed";
    }
};

  return (
    <div id="header__icon" className="header__icon-closed" onClick={clickHandler}>|||</div>
  );
};
