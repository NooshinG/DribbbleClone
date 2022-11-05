class Accardion {
  mobileNav;
  constructor() {
    this.mobileNav = document.querySelector(".subMobileNav__Section");
    this.mobileNav.addEventListener("click", this.navSectionHandler);
  }

  navSectionHandler(event) {
    if (event.target.tagName != "H3") {
      return;
    }
    const targetSectionId = event.target.id;

    document
      .getElementById(`${targetSectionId}`)
      .nextElementSibling.classList.toggle("showList");
  }
}

class BurgerMenu{
  burgerIcon;
  subNavigation;
  constructor(){
    this.burgerIcon = document.querySelector(".BurgerMenu");
    this.burgerIcon.addEventListener("click",this.showMenuListHandler.bind(this));
    this.subNavigation = document.querySelector(".subMobileNav");
  }

  showMenuListHandler(){
    this.subNavigation.classList.toggle("showList");
  }
}

class Dribble {
  static init() {
    new Accardion();
    new BurgerMenu();
  }
}

Dribble.init();
// new Accardion();
