SELECT fondi.fondo, uffici.ufficio, uffici.alias, uffici.inventario AS inventario_uffici, uffici.note AS note_uffici, serie.serie, serie.inventario AS inventario_serie, serie.note AS note_serie, serie."ordine serie"
   FROM fondi
   JOIN uffici ON fondi.fondo::text = uffici.fondo::text
   LEFT JOIN serie ON uffici.ufficio::text = serie.ufficio::text AND uffici.fondo::text = serie.fondo::text
  ORDER BY fondi."ordine fondi", serie."ordine serie";