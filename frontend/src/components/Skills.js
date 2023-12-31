import { technologies } from "../constants";
export const Skills = () => {
  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className=" skill-bx wow zoomIn">
          <h2 className="mb-3">Skills</h2>

          <div className="skills-grid">
            {technologies.map((technology, index) => (
              <div className="tech-skill" key={index}>
                <img src={technology.icon} alt="technologies" />
                {<p>{technology.name}</p>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
