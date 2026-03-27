import React, { useState, useMemo } from "react";
import { usePage } from "@inertiajs/react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  BarChart, Bar, Legend, Cell
} from "recharts";

export default function Dashboard() {
  // 1. SAFE DATA RETRIEVAL
  const { props } = usePage();
  const serverData = props?.data || [];
  
  // If props are missing entirely, show a simple safety message
  if (!props) return <div style={{ padding: "40px", textAlign: "center" }}>Loading Dashboard Props...</div>;

  // 2. YEAR RANGE LOGIC
  const yearsInData = serverData.map(item => item.year).filter(y => typeof y === "number");
  const minYear = yearsInData.length ? Math.min(...yearsInData) : 2015;
  const maxYear = yearsInData.length ? Math.max(...yearsInData) : 2026;

  // 3. FILTER STATE (Added the missing 3 from your image)
  const [year, setYear] = useState(maxYear);
  const [orgType, setOrgType] = useState("All");
  const [orgUnit, setOrgUnit] = useState("All");
  const [metric, setMetric] = useState("Publications");
  const [domain, setDomain] = useState("All");
  const [professor, setProfessor] = useState("All");

  // 4. FILTERING LOGIC
  const filtered = useMemo(() => {
    return serverData.filter(item => {
      return (
        item.year >= minYear &&
        item.year <= year &&
        (orgType === "All" || item.org_unit_type === orgType) &&
        (orgUnit === "All" || item.org_unit_name === orgUnit)
      );
    });
  }, [serverData, year, orgType, orgUnit, minYear]);

  // 5. METRIC CALCULATIONS
  const stats = useMemo(() => ({
    pubs: filtered.filter(i => i.metric === "publications").reduce((s, i) => s + i.value, 0),
    cits: filtered.filter(i => i.metric === "citations").reduce((s, i) => s + i.value, 0),
    high: filtered.filter(i => i.metric === "high_impact").reduce((s, i) => s + i.value, 0),
    orgs: new Set(filtered.map(i => i.org_unit_name)).size
  }), [filtered]);

  // 6. CHART DATA: Top 10 Units
  const topOrgData = useMemo(() => {
    return Object.values(
      filtered.filter(i => i.metric === "publications").reduce((acc, item) => {
        if (!acc[item.org_unit_name]) acc[item.org_unit_name] = { name: item.org_unit_name, value: 0 };
        acc[item.org_unit_name].value += item.value;
        return acc;
      }, {})
    ).sort((a, b) => b.value - a.value).slice(0, 10);
  }, [filtered]);

  // 7. CHART DATA: Line Chart (Publications Over Time)
  const lineData = useMemo(() => {
    const counts = filtered.filter(i => i.metric === "publications").reduce((acc, item) => {
      acc[item.year] = (acc[item.year] || 0) + item.value;
      return acc;
    }, {});
    return Object.entries(counts).map(([year, value]) => ({ year, value })).sort((a, b) => a.year - b.year);
  }, [filtered]);

  const allYears = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  return (
    <div style={{ backgroundColor: "#f8fafc", minHeight: "100vh", fontFamily: "sans-serif" }}>
      
      {/* 1. DARK BLUE HEADER */}
      <div style={{ backgroundColor: "#1e3a8a", color: "white", padding: "24px 40px", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>IRD Publications Dashboard (POC)</h1>
        <p style={{ margin: "4px 0 0 0", fontSize: "12px", opacity: 0.8 }}>Interactive cross-filtering demo for IIT Delhi R&D Division</p>
      </div>

      <div style={{ maxWidth: "1600px", margin: "0 auto", padding: "24px" }}>
        
        {/* 2. UPDATED FILTER BAR (With all 5 filters from your image) */}
        <div style={{ backgroundColor: "white", padding: "16px", borderRadius: "12px", display: "flex", flexWrap: "wrap", gap: "15px", alignItems: "center", marginBottom: "24px", border: "1px solid #e2e8f0" }}>
          <select style={selectStyle} value={orgType} onChange={(e)=>setOrgType(e.target.value)}>
             <option value="All">Org Type</option>
             {[...new Set(serverData.map(i => i.org_unit_type))].map(t => <option key={t} value={t}>{t}</option>)}
          </select>

          <select style={{ ...selectStyle, minWidth: "200px" }} value={orgUnit} onChange={(e)=>setOrgUnit(e.target.value)}>
             <option value="All">Dept/Unit/Centre/School</option>
             {[...new Set(serverData.map(i => i.org_unit_name))].map(u => <option key={u} value={u}>{u}</option>)}
          </select>

          <div style={{ display: "flex", flexDirection: "column", minWidth: "180px" }}>
            <span style={{ fontSize: "10px", color: "#64748b", fontWeight: "bold" }}>Year Range: {minYear}-{year}</span>
            <input type="range" min={minYear} max={maxYear} value={year} onChange={(e)=>setYear(+e.target.value)} />
          </div>

          <select style={selectStyle} value={metric} onChange={(e)=>setMetric(e.target.value)}>
            <option>Publications</option>
            <option>Citations</option>
            <option>High Impact</option>
          </select>

          <select style={selectStyle} value={domain}>
            <option>POC Domain</option>
          </select>

          <select style={selectStyle} value={professor}>
            <option>POC Professor</option>
          </select>

          <button onClick={() => {setOrgType("All"); setOrgUnit("All"); setYear(maxYear);}} style={{ marginLeft: "auto", color: "#1e3a8a", fontWeight: "bold", border: "none", background: "none", cursor: "pointer" }}>Reset Filters</button>
        </div>

        {/* 3. METRIC CARDS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "24px" }}>
          <StatCard title="TOTAL PUBLICATIONS" value={stats.pubs} color="#1e3a8a" />
          <StatCard title="TOTAL CITATIONS" value={stats.cits} color="#10b981" />
          <StatCard title="HIGH IMPACT PUBLICATIONS" value={stats.high} color="#f59e0b" />
          <StatCard title="ORG UNITS INCLUDED" value={stats.orgs} color="#a855f7" />
        </div>

        {/* 4. CHARTS ROW 1 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          <ChartBox title="Publications Over Time">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 4, fill: "#1e3a8a", stroke: "#fff" }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox title="Top Org Units">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topOrgData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={120} style={{ fontSize: "10px" }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#1e3a8a" radius={[0, 4, 4, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </div>

        {/* 5. CHARTS ROW 2 (Heatmap & Comparison) */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <ChartBox title="Metric Comparison (Top 8)">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={topOrgData.slice(0, 8)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                <Tooltip />
                <Bar dataKey="value" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>

          <ChartBox title="Heatmap: Year x Org Type">
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", fontSize: "11px", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left", padding: "8px", borderBottom: "1px solid #eee", color: "#94a3b8" }}>Type \ Year</th>
                    {allYears.map(y => <th key={y} style={{ textAlign: "center", color: "#94a3b8" }}>{y}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {[...new Set(serverData.map(i => i.org_unit_type))].map(type => (
                    <tr key={type}>
                      <td style={{ padding: "8px", borderBottom: "1px solid #f8fafc", fontWeight: "bold" }}>{type}</td>
                      {allYears.map(y => {
                        const val = filtered.find(i => i.org_unit_type === type && i.year === y && i.metric === "publications")?.value || 0;
                        return (
                          <td key={y} style={{ padding: "2px" }}>
                            <div style={{ 
                                backgroundColor: val > 0 ? "#1e3a8a" : "#f1f5f9", 
                                color: val > 0 ? "white" : "#cbd5e1", 
                                padding: "6px 2px", 
                                textAlign: "center", 
                                borderRadius: "4px", 
                                fontWeight: "bold" 
                            }}>
                                {val}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ChartBox>
        </div>

      </div>
    </div>
  );
}

// SHARED STYLES
const selectStyle = { padding: "8px", borderRadius: "6px", border: "1px solid #cbd5e1", fontSize: "13px", backgroundColor: "#fff" };

function StatCard({ title, value, color }) {
  return (
    <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "12px", borderLeft: `6px solid ${color}`, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
      <p style={{ margin: "0 0 8px 0", fontSize: "10px", color: "#94a3b8", textTransform: "uppercase", fontWeight: "bold", letterSpacing: "0.05em" }}>{title}</p>
      <h2 style={{ margin: 0, color: color, fontSize: "28px", fontWeight: "800" }}>{value.toLocaleString()}</h2>
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div style={{ backgroundColor: "white", padding: "24px", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
      <h4 style={{ margin: "0 0 20px 0", color: "#64748b", textTransform: "uppercase", fontSize: "11px", fontWeight: "bold", letterSpacing: "0.05em" }}>{title}</h4>
      {children}
    </div>
  );
}