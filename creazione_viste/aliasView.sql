 SELECT alias_notai.alias, alias_notai.cognome, alias_notai.nome, alias_notai.fonte
   FROM notai
   JOIN alias_notai ON notai.nome::text = alias_notai.nome::text AND notai.cognome::text = alias_notai.cognome::text
  ORDER BY alias_notai.cognome, alias_notai.nome, alias_notai.fonte;