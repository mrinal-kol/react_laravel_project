import React, { useState, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar
} from "recharts";

export default function Dashboard() {

  const { data: serverData } = usePage().props;
  const data = serverData || [];

  const [yearRange, setYearRange] = useState([2015, 2019]);
  const [orgType, setOrgType] = useState("All");
  const [orgUnit, setOrgUnit] = useState("All");

  // ✅ FILTER
  const filtered = useMemo(() => {
    return data.filter(item => {
      return (
        item.metric === "publications" &&
        item.year >= yearRange[0] &&
        item.year <= yearRange[1] &&
        (orgType === "All" || item.org_unit_type === orgType) &&
        (orgUnit === "All" || item.org_unit_name === orgUnit)
      );
    });
  }, [data, yearRange, orgType, orgUnit]);

  // ✅ CARDS
  const totalPublications = filtered.reduce((s, i) => s + i.value, 0);
  const totalCitations = 0;
  const highImpact = 0;
  const orgUnitsIncluded = new Set(filtered.map(i => i.org_unit_name)).size;

  // ✅ LINE DATA (FIXED + SORTED)
  const lineData = Object.values(
    filtered.reduce((acc, item) => {
      if (!acc[item.year]) acc[item.year] = { year: item.year, total: 0 };
      acc[item.year].total += item.value;
      return acc;
    }, {})
  ).sort((a, b) => a.year - b.year);   // 🔥 IMPORTANT

  // ✅ BAR DATA
  const topOrg = Object.values(
    filtered.reduce((acc, item) => {
      if (!acc[item.org_unit_name]) {
        acc[item.org_unit_name] = { name: item.org_unit_name, value: 0 };
      }
      acc[item.org_unit_name].value += item.value;
      return acc;
    }, {})
  );

  // ✅ HEATMAP
  const heatmap = {};
  filtered.forEach(item => {
    if (!heatmap[item.org_unit_type]) heatmap[item.org_unit_type] = {};
    heatmap[item.org_unit_type][item.year] =
      (heatmap[item.org_unit_type][item.year] || 0) + item.value;
  });

  const years = [...new Set(filtered.map(i => i.year))].sort();
  const orgTypes = [...new Set(data.map(i => i.org_unit_type))];
  const orgUnits = [...new Set(data.map(i => i.org_unit_name))];

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>

      <h2>IRD Publications Dashboard</h2>

      {/* FILTER */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>

        <select value={orgType} onChange={(e)=>setOrgType(e.target.value)}>
          <option value="All">Org Type</option>
          {orgTypes.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <select value={orgUnit} onChange={(e)=>setOrgUnit(e.target.value)}>
          <option value="All">Dept/Unit</option>
          {orgUnits.map(u => <option key={u} value={u}>{u}</option>)}
        </select>

        <div>
          <label>Year: {yearRange[0]} - {yearRange[1]}</label><br/>

          <input type="range" min="2015" max="2019"
            value={yearRange[0]}
            onChange={(e)=>setYearRange([+e.target.value, yearRange[1]])}
          />

          <input type="range" min="2015" max="2019"
            value={yearRange[1]}
            onChange={(e)=>setYearRange([yearRange[0], +e.target.value])}
          />
        </div>

        <button onClick={()=>{
          setOrgType("All");
          setOrgUnit("All");
          setYearRange([2015, 2019]);
        }}>
          Reset
        </button>

      </div>

      {/* CARDS */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Card title="Total Publications" value={totalPublications} />
        <Card title="Total Citations" value={0} />
        <Card title="High Impact" value={0} />
        <Card title="Org Units Included" value={orgUnitsIncluded} />
      </div>

      {/* CHARTS */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

        <div>
          <h4>Publications Over Time</h4>
          <LineChart width={400} height={250} data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#8884d8" /> {/* 🔥 FIX */}
          </LineChart>
        </div>

        <div>
          <h4>Top Org Units</h4>
          <BarChart width={400} height={250} data={topOrg}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" /> {/* 🔥 FIX */}
          </BarChart>
        </div>

      </div>

      {/* HEATMAP */}
      <div style={{ marginTop: "30px" }}>
        <h4>Heatmap (Year vs Org Type)</h4>

        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Type / Year</th>
              {years.map(y => <th key={y}>{y}</th>)}
            </tr>
          </thead>

          <tbody>
            {Object.keys(heatmap).map(type => (
              <tr key={type}>
                <td>{type}</td>
                {years.map(y => (
                  <td key={y}>{heatmap[type][y] || 0}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}

function Card({ title, value }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "8px",
      minWidth: "180px"
    }}>
      <h5>{title}</h5>
      <h2>{value}</h2>
    </div>
  );
}