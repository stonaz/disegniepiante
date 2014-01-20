 SELECT fondi."ordine fondi", uffici."ordine uffici", serie."ordine serie", 
    fondi.fondo, fondi.alias AS alias_fondo, fondi.note AS note_fondo, 
    uffici.ufficio, uffici.alias AS alias_ufficio, 
    uffici.inventario AS inventario_ufficio, uffici.note AS note_ufficio, 
    serie.serie, serie.inventario AS inventario_serie, serie.note AS note_serie
   FROM fondi
   JOIN uffici ON fondi.fondo::text = uffici.fondo::text
   LEFT JOIN serie ON uffici.ufficio::text = serie.ufficio::text AND uffici.fondo::text = serie.fondo::text
  ORDER BY fondi."ordine fondi", uffici."ordine uffici", serie."ordine serie";