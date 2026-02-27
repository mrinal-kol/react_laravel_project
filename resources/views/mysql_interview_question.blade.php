<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }} | Payment</title>

    @viteReactRefresh
    @vite('resources/js/app.jsx')

    

   
</head>

<body>
  @include('menu')
<div class="container">

  <h3>Common MySQL Functions With Laravel</h3>

  <table>
    <tr><th>MySQL Function</th><th>Laravel Syntax</th></tr>
    <tr><td>UPPER()</td><td>DB::raw('UPPER(name)')</td></tr>
    <tr><td>LOWER()</td><td>DB::raw('LOWER(name)')</td></tr>
    <tr><td>CONCAT()</td><td>DB::raw("CONCAT(col1, col2)")</td></tr>
    <tr><td>COUNT()</td><td>DB::raw('COUNT(*)')</td></tr>
    <tr><td>SUM()</td><td>DB::raw('SUM(amount)')</td></tr>
    <tr><td>DATE()</td><td>whereDate()</td></tr>
    <tr><td>YEAR()</td><td>whereYear()</td></tr>
    <tr><td>MONTH()</td><td>whereMonth()</td></tr>
    <tr><td>NOW()</td><td>DB::raw('NOW()')</td></tr>
    <tr><td>CURDATE()</td><td>DB::raw('CURDATE()')</td></tr>
  </table>

  <h1>🔥 📌 MySQL Datatype Full List (Max Size + Details)</h1>
  <p class="lead">Compact cheat-sheet showing storage, max size, range and short descriptions for common MySQL datatypes.</p>

  <!-- 1. STRING TYPES -->
  <section>
    <div class="section-head"><div class="badge">🟦</div><h2>1. String Types</h2></div>
    <table>
      <tr><th>Type</th><th>Storage</th><th>Max Length / Notes</th><th>Description</th></tr>
      <tr><td class="mono">CHAR(n)</td><td>n bytes</td><td>255 chars</td><td>Fixed-length string</td></tr>
      <tr><td class="mono">VARCHAR(n)</td><td>n + 1/2 bytes</td><td>65,535 bytes</td><td>Variable-length string</td></tr>
      <tr><td class="mono">TINYTEXT</td><td>1 + data</td><td>255 bytes</td><td>Very small text</td></tr>
      <tr><td class="mono">TEXT</td><td>2 + data</td><td>64 KB</td><td>Small text</td></tr>
      <tr><td class="mono">MEDIUMTEXT</td><td>3 + data</td><td>16 MB</td><td>Medium text</td></tr>
      <tr><td class="mono">LONGTEXT</td><td>4 + data</td><td>4 GB</td><td>Large text</td></tr>
      <tr><td class="mono">ENUM</td><td>1–2 bytes</td><td>65,535 values</td><td>Single value list</td></tr>
      <tr><td class="mono">SET</td><td>1–8 bytes</td><td>64 members</td><td>Multiple values</td></tr>
    </table>
  </section>

  <!-- 2. BINARY -->
  <section>
    <div class="section-head"><div class="badge">🟥</div><h2>2. Binary / BLOB Types</h2></div>
    <table>
      <tr><th>Type</th><th>Storage</th><th>Max Size</th><th>Description</th></tr>
      <tr><td class="mono">TINYBLOB</td><td>1 + data</td><td>255 bytes</td><td>Very small binary</td></tr>
      <tr><td class="mono">BLOB</td><td>2 + data</td><td>64 KB</td><td>Small binary</td></tr>
      <tr><td class="mono">MEDIUMBLOB</td><td>3 + data</td><td>16 MB</td><td>Medium binary</td></tr>
      <tr><td class="mono">LONGBLOB</td><td>4 + data</td><td>4 GB</td><td>Large binary</td></tr>
    </table>
  </section>

  <!-- 3. NUMERIC -->
  <section>
    <div class="section-head"><div class="badge">🟩</div><h2>3. Numeric Types</h2></div>
    <table>
      <tr><th>Type</th><th>Storage</th><th>Unsigned</th><th>Signed</th></tr>
      <tr><td class="mono">TINYINT</td><td>1 byte</td><td>0–255</td><td>-128–127</td></tr>
      <tr><td class="mono">SMALLINT</td><td>2 bytes</td><td>0–65,535</td><td>-32,768–32,767</td></tr>
      <tr><td class="mono">MEDIUMINT</td><td>3 bytes</td><td>0–16,777,215</td><td>-8,388,608–8,388,607</td></tr>
      <tr><td class="mono">INT</td><td>4 bytes</td><td>0–4B</td><td>-2B–2B</td></tr>
      <tr><td class="mono">BIGINT</td><td>8 bytes</td><td>0–18Q</td><td>-9Q–9Q</td></tr>
    </table>
  </section>

  <!-- 4. DECIMAL -->
  <section>
    <div class="section-head"><div class="badge">🟧</div><h2>4. DECIMAL Storage</h2></div>
    <table>
      <tr><th>Total Digits</th><th>Storage</th></tr>
      <tr><td>1–2</td><td>1 byte</td></tr>
      <tr><td>3–4</td><td>2 bytes</td></tr>
      <tr><td>5–6</td><td>3 bytes</td></tr>
      <tr><td>7–9</td><td>4 bytes</td></tr>
      <tr><td>10–18</td><td>5–8 bytes</td></tr>
    </table>
    <div class="summary">
      ✔ Max DECIMAL digits = 65<br>
      ✔ Max bytes used = 17
    </div>
  </section>

  <!-- 5. DATE -->
  <section>
    <div class="section-head"><div class="badge">🟨</div><h2>5. Date & Time Types</h2></div>
    <table>
      <tr><th>Type</th><th>Storage</th><th>Range</th></tr>
      <tr><td class="mono">DATE</td><td>3 bytes</td><td>1000–9999</td></tr>
      <tr><td class="mono">DATETIME</td><td>5 bytes</td><td>1000–9999</td></tr>
      <tr><td class="mono">TIMESTAMP</td><td>4 bytes</td><td>1970–2038</td></tr>
      <tr><td class="mono">TIME</td><td>3 bytes</td><td>-838 to 838</td></tr>
      <tr><td class="mono">YEAR</td><td>1 byte</td><td>1901–2155</td></tr>
    </table>
  </section>

  <!-- 6. SPECIAL -->
  <section>
    <div class="section-head"><div class="badge">🟪</div><h2>6. Special Types</h2></div>
    <table>
      <tr><th>Type</th><th>Description</th></tr>
      <tr>
        <td class="mono">JSON</td>
        <td>Stores JSON documents (optimized storage in MySQL 5.7+)</td>
      </tr>
      <tr><td class="mono">NULL</td><td>No value</td></tr>
      <tr><td class="mono">BOOLEAN</td><td>Alias for TINYINT(1)</td></tr>
    </table>
  </section>

  <!-- FINAL -->
  <section>
    <div class="section-head"><div class="badge">⭐</div><h2>FINAL SUMMARY</h2></div>
    <div class="summary">
      VARCHAR = 65,535 bytes<br>
      TEXT = 64 KB<br>
      MEDIUMTEXT = 16 MB<br>
      LONGTEXT = 4 GB<br>
      INT = 4 bytes<br>
      BIGINT = 8 bytes<br>
      DECIMAL = up to 17 bytes
    </div>
    <p class="cta">Bro, want PDF or optimized datatype guide?</p>
  </section>

</div>

</body>
</html>
