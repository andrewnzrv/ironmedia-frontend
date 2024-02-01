import { Container } from "@mui/material";
import { FaGithub } from "react-icons/fa";
import styles from "../styles/About.module.css";

const About = () => {
  return (
    <>
      <Container maxWidth="xl" className="container">
        <h1 className="main-title">
          Hei There! Welcome to the
          <br /> MERN Stack Open Art Gallery project.
        </h1>

        <p className={styles.paragraph}>
          In our quest to improve our skills with the MERN stack, we initiated a
          project that not only broadened our technical expertise but also
          established a platform for sharing various forms of art. This project
          enables users to upload and share their artworks seamlessly, evoking
          the familiar experience of a social media application.
        </p>
        <br />
        <p className={styles.headerAuthor}>The project is developed by:</p>
        <div className={styles.githubList}>
          <div>
            <a href="https://github.com/andreinazarov" target="_blank">
              Andrei Nazarov
            </a>
          </div>
          <div>
            <a href="https://github.com/DanieleMaselli" target="_blank">
              Daniele Maselli
            </a>
          </div>
          <div>
            <a href="https://github.com/VascoGodinho" target="_blank">
              Vasco Godinho
            </a>
          </div>
          <br />
          <p className={styles.headerAuthor}>Code Repository:</p>
          <div>
            <a
              href="https://github.com/andrewnzrv/ironmedia-frontend"
              target="_blank"
            >
              Github repository frontend
            </a>
          </div>
          <div>
            <a
              href="https://github.com/andrewnzrv/ironmedia-backend"
              target="_blank"
            >
              Github repository backend
            </a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default About;
