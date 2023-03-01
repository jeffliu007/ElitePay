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
      <a
        href="https://github.com/jeffliu007"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-github"></i>
      </a>
      <a
        href="https://www.linkedin.com/in/jeffreyliu17/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa-brands fa-linkedin"></i>
      </a>
    </div>
  );
};

export default Footer;
