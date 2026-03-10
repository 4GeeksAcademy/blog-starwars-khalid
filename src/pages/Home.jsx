import { useAppContext } from "../hooks/AppContext";
import CardItem from "../components/CardItem";

const Home = () => {
  const { people, vehicles, planets } = useAppContext();

  const Section = ({ title, items, type }) => (
    <div style={{ marginBottom: "50px" }}>
      <h2 style={{
        color: "#FFE81F",
        fontFamily: "serif",
        fontSize: "1.8rem",
        marginBottom: "20px",
        borderLeft: "4px solid #FFE81F",
        paddingLeft: "14px",
      }}>
        {title}
      </h2>
      <div style={{
        display: "flex",
        gap: "20px",
        overflowX: "auto",
        paddingBottom: "12px",
      }}>
        {items.map((item) => (
          <CardItem key={item.uid} item={item} type={type} />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      background: "#0a0a0f",
      minHeight: "100vh",
      padding: "40px 30px",
    }}>
      <Section title="Characters" items={people} type="person" />
      <Section title="Vehicles" items={vehicles} type="vehicle" />
      <Section title="Planets" items={planets} type="planet" />
    </div>
  );
};

export default Home;
