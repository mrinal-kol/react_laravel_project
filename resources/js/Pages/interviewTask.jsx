import React, { useState, useMemo } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar
} from "recharts";

export default function Dashboard() {

  const data = [
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2015, "value": 52 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2016, "value": 59 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2017, "value": 91 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2018, "value": 71 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2019, "value": 79 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2020, "value": 69 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2021, "value": 100 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2022, "value": 100 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2023, "value": 164 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2024, "value": 148 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications", "year": 2025, "value": 107 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "publications_total_2015_2025", "year": null, "value": 1040 },
  { "category": "Publication Dept", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "citations_total", "year": null, "value": 14020 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2015, "value": 47 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2016, "value": 56 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2017, "value": 73 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2018, "value": 66 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2019, "value": 68 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2020, "value": 77 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2021, "value": 117 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2022, "value": 140 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2023, "value": 126 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2024, "value": 128 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications", "year": 2025, "value": 109 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "publications_total_2015_2025", "year": null, "value": 1007 },
  { "category": "Publication Dept", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "citations_total", "year": null, "value": 21719 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2015, "value": 98 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2016, "value": 131 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2017, "value": 170 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2018, "value": 146 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2019, "value": 153 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2020, "value": 161 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2021, "value": 217 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2022, "value": 239 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2023, "value": 228 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2024, "value": 241 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications", "year": 2025, "value": 196 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "publications_total_2015_2025", "year": null, "value": 1980 },
  { "category": "Publication Dept", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "citations_total", "year": null, "value": 43529 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2015, "value": 106 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2016, "value": 137 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2017, "value": 159 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2018, "value": 122 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2019, "value": 157 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2020, "value": 165 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2021, "value": 200 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2022, "value": 245 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2023, "value": 261 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2024, "value": 291 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications", "year": 2025, "value": 312 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "publications_total_2015_2025", "year": null, "value": 2155 },
  { "category": "Publication Dept", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "citations_total", "year": null, "value": 36489 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2015, "value": 152 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2016, "value": 146 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2017, "value": 161 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2018, "value": 176 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2019, "value": 248 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2020, "value": 270 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2021, "value": 257 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2022, "value": 276 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2023, "value": 351 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2024, "value": 357 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2025, "value": 308 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "publications_total_2015_2025", "year": null, "value": 2702 },
  { "category": "Publication Dept", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Unit", "metric": "citations_total", "year": null, "value": 50914 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2015, "value": 47 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2016, "value": 56 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2017, "value": 67 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2018, "value": 31 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2019, "value": 59 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2020, "value": 62 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2021, "value": 70 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2022, "value": 68 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2023, "value": 74 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2024, "value": 70 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2025, "value": 62 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "publications_total_2015_2025", "year": null, "value": 666 },
  { "category": "Publication Dept", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Unit", "metric": "citations_total", "year": null, "value": 10944 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2015, "value": 119 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2016, "value": 201 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2017, "value": 219 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2018, "value": 181 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2019, "value": 155 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2020, "value": 138 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2021, "value": 149 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2022, "value": 185 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2023, "value": 198 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2024, "value": 157 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2025, "value": 132 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "publications_total_2015_2025", "year": null, "value": 1834 },
  { "category": "Publication Dept", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Unit", "metric": "citations_total", "year": null, "value": 41219 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2015, "value": 213 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2016, "value": 245 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2017, "value": 280 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2018, "value": 271 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2019, "value": 293 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2020, "value": 323 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2021, "value": 358 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2022, "value": 348 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2023, "value": 352 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2024, "value": 356 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications", "year": 2025, "value": 298 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "publications_total_2015_2025", "year": null, "value": 3337 },
  { "category": "Publication Dept", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Unit", "metric": "citations_total", "year": null, "value": 49520 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2015, "value": 79 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2016, "value": 84 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2017, "value": 108 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2018, "value": 111 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2019, "value": 143 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2020, "value": 142 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2021, "value": 134 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2022, "value": 205 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2023, "value": 211 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2024, "value": 214 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications", "year": 2025, "value": 221 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "publications_total_2015_2025", "year": null, "value": 1652 },
  { "category": "Publication Dept", "code": "TT", "org_unit_name": "Department of Textile and Fibre Engineering", "org_unit_type": "Unit", "metric": "citations_total", "year": null, "value": 32576 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2015, "value": 46 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2016, "value": 51 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2017, "value": 106 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2018, "value": 78 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2019, "value": 105 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2020, "value": 84 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2021, "value": 119 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2022, "value": 150 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2023, "value": 112 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2024, "value": 105 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications", "year": 2025, "value": 85 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "publications_total_2015_2025", "year": null, "value": 1041 },
  { "category": "Publication Dept", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "citations_total", "year": null, "value": 11557 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2015, "value": 34 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2016, "value": 35 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2017, "value": 29 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2018, "value": 48 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2019, "value": 52 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2020, "value": 54 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2021, "value": 65 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2022, "value": 79 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2023, "value": 54 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2024, "value": 70 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications", "year": 2025, "value": 82 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "publications_total_2015_2025", "year": null, "value": 602 },
  { "category": "Publication Dept", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "citations_total", "year": null, "value": 12759 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2015, "value": 19 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2016, "value": 23 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2017, "value": 19 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2018, "value": 18 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2019, "value": 22 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2020, "value": 42 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2021, "value": 55 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2022, "value": 56 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2023, "value": 57 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2024, "value": 74 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications", "year": 2025, "value": 34 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "publications_total_2015_2025", "year": null, "value": 419 },
  { "category": "Publication Dept", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "citations_total", "year": null, "value": 7435 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2015, "value": 57 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2016, "value": 53 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2017, "value": 47 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2018, "value": 60 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2019, "value": 45 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2020, "value": 53 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2021, "value": 88 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2022, "value": 113 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2023, "value": 123 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2024, "value": 120 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications", "year": 2025, "value": 110 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "publications_total_2015_2025", "year": null, "value": 869 },
  { "category": "Publication Dept", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "citations_total", "year": null, "value": 15866 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2015, "value": 3 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2016, "value": 4 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2017, "value": 5 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2018, "value": 5 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2019, "value": 5 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2020, "value": 3 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2021, "value": 4 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2022, "value": 0 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2023, "value": 5 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2024, "value": 6 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2025, "value": 3 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "publications_total_2015_2025", "year": null, "value": 43 },
  { "category": "Publication Dept", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "citations_total", "year": null, "value": 745 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2015, "value": 9 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2016, "value": 9 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2017, "value": 9 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2018, "value": 5 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2019, "value": 7 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2020, "value": 18 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2021, "value": 13 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2022, "value": 17 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2023, "value": 27 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2024, "value": 32 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications", "year": 2025, "value": 34 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "publications_total_2015_2025", "year": null, "value": 180 },
  { "category": "Publication Dept", "code": "TRIPP", "org_unit_name": "Transportation Research and Injury Prevention Centre", "org_unit_type": "Centre", "metric": "citations_total", "year": null, "value": 2427 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2015, "value": 38 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2016, "value": 46 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2017, "value": 47 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2018, "value": 49 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2019, "value": 60 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2020, "value": 53 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2021, "value": 69 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2022, "value": 62 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2023, "value": 77 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2024, "value": 67 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications", "year": 2025, "value": 69 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "publications_total_2015_2025", "year": null, "value": 637 },
  { "category": "Publication Dept", "code": "SBS", "org_unit_name": "Kusuma School of Biological Sciences", "org_unit_type": "School", "metric": "citations_total", "year": null, "value": 9821 },
  { "category": "Publication Dept", "code": "Yardi", "org_unit_name": "Yardi School of Artificial Intelligence", "org_unit_type": "School", "metric": "publications", "year": 2021, "value": 6 },
  { "category": "Publication Dept", "code": "Yardi", "org_unit_name": "Yardi School of Artificial Intelligence", "org_unit_type": "School", "metric": "publications", "year": 2022, "value": 47 },
  { "category": "Publication Dept", "code": "Yardi", "org_unit_name": "Yardi School of Artificial Intelligence", "org_unit_type": "School", "metric": "publications", "year": 2023, "value": 90 },
  { "category": "Publication Dept", "code": "Yardi", "org_unit_name": "Yardi School of Artificial Intelligence", "org_unit_type": "School", "metric": "publications", "year": 2024, "value": 85 },
  { "category": "Publication Dept", "code": "Yardi", "org_unit_name": "Yardi School of Artificial Intelligence", "org_unit_type": "School", "metric": "publications", "year": 2025, "value": 86 },
  { "category": "Publication Dept", "code": "Yardi", "org_unit_name": "Yardi School of Artificial Intelligence", "org_unit_type": "School", "metric": "publications_total_2015_2025", "year": null, "value": 314 },
  { "category": "Publication Dept", "code": "Yardi", "org_unit_name": "Yardi School of Artificial Intelligence", "org_unit_type": "School", "metric": "citations_total", "year": null, "value": 7148 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications", "year": 2016, "value": 1 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications", "year": 2017, "value": 0 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications", "year": 2018, "value": 2 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications", "year": 2019, "value": 2 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications", "year": 2020, "value": 8 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications", "year": 2021, "value": 12 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications", "year": 2022, "value": 15 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications", "year": 2023, "value": 26 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications", "year": 2024, "value": 22 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications", "year": 2025, "value": 32 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "publications_total_2015_2025", "year": null, "value": 120 },
  { "category": "Publication Dept", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "citations_total", "year": null, "value": 1850 },
  { "category": "Publication impact", "code": "CAS", "org_unit_name": "Centre for Atmospheric Sciences", "org_unit_type": "Centre", "metric": "high_impact_publications", "year": null, "value": 32 },
  { "category": "Publication impact", "code": "CE", "org_unit_name": "Department of Civil Engineering", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 92 },
  { "category": "Publication impact", "code": "CSE", "org_unit_name": "Department of Materials Science and Engineering", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 91 },
  { "category": "Publication impact", "code": "PHY", "org_unit_name": "Department of Physics", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 90 },
  { "category": "Publication impact", "code": "CHY", "org_unit_name": "Department of Chemistry", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 135 },
  { "category": "Publication impact", "code": "SBS", "org_unit_name": "School of Biological Sciences", "org_unit_type": "School", "metric": "high_impact_publications", "year": null, "value": 55 },
  { "category": "Publication impact", "code": "SoPP", "org_unit_name": "School of Public Policy", "org_unit_type": "School", "metric": "high_impact_publications", "year": null, "value": 23 },
  { "category": "Publication impact", "code": "CHE", "org_unit_name": "Department of Mechanical Engineering", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 46 },
  { "category": "Publication impact", "code": "CARE", "org_unit_name": "Centre for Applied Research in Electronics", "org_unit_type": "Centre", "metric": "high_impact_publications", "year": null, "value": 15 },
  { "category": "Publication impact", "code": "CHE", "org_unit_name": "Department of Electrical Engineering", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 107 },
  { "category": "Publication impact", "code": "CBME", "org_unit_name": "Centre for Biomedical Engineering", "org_unit_type": "Centre", "metric": "high_impact_publications", "year": null, "value": 52 },
  { "category": "Publication impact", "code": "DESE", "org_unit_name": "Department of Energy Science and Engineering", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 94 },
  { "category": "Publication impact", "code": "CHE", "org_unit_name": "Department of Chemical Engineering", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 143 },
  { "category": "Publication impact", "code": null, "org_unit_name": "Department of Textile Technology", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 94 },
  { "category": "Publication impact", "code": null, "org_unit_name": "Centre for Sensors, Instrumentation and Cyber Physical System Engineering", "org_unit_type": "Centre", "metric": "high_impact_publications", "year": null, "value": 6 },
  { "category": "Publication impact", "code": "DBEB", "org_unit_name": "Department of Biochemical Engineering and Biotechnology", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 42 },
  { "category": "Publication impact", "code": "CSE", "org_unit_name": "Department of Computer Science and Engineering", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 19 },
  { "category": "Publication impact", "code": null, "org_unit_name": "Department of Management Studies", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 89 },
  { "category": "Publication impact", "code": null, "org_unit_name": "Department of Humanities and Social Sciences", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 8 },
  { "category": "Publication impact", "code": "AM", "org_unit_name": "Department of Applied Mechanics", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 29 },
  { "category": "Publication impact", "code": "CART", "org_unit_name": "Centre for Automotive Research and Tribology", "org_unit_type": "Centre", "metric": "high_impact_publications", "year": null, "value": 11 },
  { "category": "Publication impact", "code": null, "org_unit_name": "Centre for Rural Development and Technology", "org_unit_type": "Centre", "metric": "high_impact_publications", "year": null, "value": 44 },
  { "category": "Publication impact", "code": "TRIPP", "org_unit_name": "Transportation research and injury prevention - centre", "org_unit_type": "Centre", "metric": "high_impact_publications", "year": null, "value": 9 },
  { "category": "Publication impact", "code": "CSC", "org_unit_name": "Computer Services Centre", "org_unit_type": "Centre", "metric": "high_impact_publications", "year": null, "value": 3 },
  { "category": "Publication impact", "code": null, "org_unit_name": "Department of Mathematics", "org_unit_type": "Department", "metric": "high_impact_publications", "year": null, "value": 2 },
  { "category": "Publication impact", "code": null, "org_unit_name": "TRIP Centre-Transportation Research and Injury Prevention Programme", "org_unit_type": "Centre", "metric": "high_impact_publications", "year": null, "value": 2 }
];

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