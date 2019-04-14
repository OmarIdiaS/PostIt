Notre application contient les routes suivantes : 

  / : correspond à la pages des utilisateur non connectée (guest) 
  
  /signin : pour l'enregistrement des utilisateurs 
  
  /p : la page principale contenant les post-it apès connexion de l'utilisateur.
  
  /suppr:  pour la suppression des post_it (l'admin peut tout supprimer contrairement à l'utilisateur qui n'a droit de supprimer que ses post-its à lui)
  
  /logout : pour que l'utilisateur quitte la session 
  
  /:n : pour donner à l'utilisateur accès au tableau contenant ses propre post_its.
  
  Chaque utilisateur peut accéder à un tableau contenant ses post-it via le chemin (/login).
  
  La page principale englobe l'ensemble des post-it, et correspond aux droits des utilisateurs non-connectés. 
  Celle -ci contient un lien de connexion pour permettre à l'utilisateur de se connecter à son compte et ainsi créer, supprimer ou modifier ses post-its.
  ( seuls les utilisateurs connectés peuvent créer leurs postit);
  
  un nouveau client peut s'enregistrer via la page singin.
  
  
  Lorsque l'utilisateur fait un double-clic n'importe où dans la page, un popup s'ouvre,
  permettant de saisir un texte. Le post-it est crée selon les coordonnées du double-click.
  La date ainsi que l'auteur apparraissent sur celui-ci.
  LEs icones à doite en bas permettent à l'utilisateur de supprimer ou modifier le texte qu'il a saisit.
  La date correspond à celle de la dernière modification.
  Les post-it récentes sont en dessus des anciennes.
  Il y a une possibilité de faire un drag and drop des post-its.
  
  Chaque utilisateur peut accéder à un tableau contenant ses post-it via le chemin (/login).