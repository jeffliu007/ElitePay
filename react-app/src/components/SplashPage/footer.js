const Footer = () => {
  const footer_apps = [
    "Software:",
    "Javascript",
    "React",
    "Redux",
    "Python",
    "SQLAlchemy",
    "Node",
  ];

  return (
    <div className="SplashPage-Footer">
      {footer_apps.map((app) => {
        return (
          <div className="SplashPage-Footer-Text" key={app}>
            {app}
          </div>
        );
      })}
      <a href="https://github.com/jeffliu007">
        <i class="fa-brands fa-github"></i>
      </a>
    </div>
  );
};

export default Footer;
