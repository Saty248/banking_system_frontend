import Layout from "./Layout";

const List = ({ data }) => (
  <ul>
    <li>
      {data.map((item) => (
        <div>{item}</div>
      ))}
    </li>
  </ul>
);
const IdexDtl = ({ header, body }) => {
  let array = body || [];

  return (
    <div className="block w-1/5 h-2/5 p-6  border border-gray-200 rounded-lg shadow hover:text-blue-700">
      <h5 className="mb-2 bg-[#9376E0] text-2xl font-bold tracking-tight text-white text-center">
        {header}
      </h5>
      <div className="text-base text-[#f1508b]">
        <List data={body} />
      </div>
    </div>
  );
};

module.exports = IdexDtl;
