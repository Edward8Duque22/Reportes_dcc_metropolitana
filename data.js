/* ===== Datos del Reglamento (texto literal) ===== */
const FALTAS = {
 leve: { nombre:"Leve", art:28, sancion:"Amonestación escrita", ref:"Art. 32, num. 1", efecto:"Se registra en la hoja de vida del voluntario (Art. 33, num. 1).", items:[
  `Faltar o llegar tarde en dos (2) oportunidades consecutivas durante un (1) mes a las actividades de apoyo a las que fuera convocado, así como a las capacitaciones o reuniones sin justificación alguna;`,
  `Faltar en dos (2) oportunidades consecutivas a las asambleas convocadas por la Junta de defensa civil a la que pertenezca, sin justificación alguna;`,
  `No actualizar oportunamente la información registrada en su hoja de vida en el Sistema de Información Misional;`,
  `Portar inadecuadamente el uniforme o utilizando elementos diferentes a los autorizados en el reglamento de uniformes, insignias y distintivos establecido por la entidad;`,
  `Evitar el ingreso de aspirantes a la organización sin justificación alguna.`
 ]},
 grave: { nombre:"Grave", art:29, sancion:"Suspensión entre treinta (30) y ciento ochenta (180) días", ref:"Art. 32, num. 2", efecto:"Separación temporal como voluntario de las actividades de apoyo a la entidad (Art. 33, num. 2).", items:[
  `No cuidar los elementos que le fueron asignados de manera temporal para el desarrollo de las actividades de apoyo a la entidad;`,
  `Hacer uso indebido del nombre, recursos, imagen y utilización de prendas de la entidad por intermedio de la organización a la que pertenezca, para beneficio personal o de terceros;`,
  `Usar los uniformes, distintivos y documentos de identificación de la Defensa Civil Colombiana, en actos de carácter personal;`,
  `Retener u omitir la entrega de bienes fiscales a los voluntarios sin justificación alguna para la asistencia a una emergencia o desastre a la que fuere convocado y destinados para tal fin;`,
  `No entregar al momento del retiro el uniforme institucional suministrado por la entidad;`,
  `Incurrir en conducta descrita como falta leve en dos (2) oportunidades;`,
  `No utilizar los elementos de protección personal requeridos para el apoyo a las actividades que desarrolla la entidad, a las que fuere convocado;`,
  `No denunciar cualquier tipo de conducta que pueda dar lugar a una investigación penal, fiscal o disciplinaria de la cual tenga conocimiento con ocasión del servicio o que se cometa en la organización de la Defensa Civil Colombiana;`,
  `No presentar informes en forma ordinaria o extraordinaria sobre las actividades administrativas, financieras, operacionales y manejo de bienes fiscales, para el caso de los dignatarios de las juntas de Defensa Civil. Para el caso de los voluntarios responsables de los comités, no presentar los informes de manejo de bienes fiscales y actividades operativas;`,
  `No rendir cuentas en la forma y términos establecidos por la Defensa Civil Colombiana en los meses de junio y noviembre de cada año ante la Dirección Seccional, por parte de los dignatarios de las juntas de Defensa Civil;`,
  `Integrar la Junta Directiva de la junta de Defensa Civil estando inmerso en una causal de inhabilidad, impedimento, incompatibilidad o conflicto de intereses descritos en el presente reglamento;`,
  `Hacer uso indebido de la documentación e información de carácter reservada, que por razón de su calidad de voluntario llegue a tener conocimiento;`,
  `Faltar o llegar tarde en tres (3) oportunidades durante un (1) mes y sin justificación alguna a participar en las actividades de apoyo que presta a la entidad, así como en las capacitaciones o reuniones para los cuales haya sido convocado;`,
  `No asistir a las asambleas convocadas por la Junta Directiva de la junta de Defensa Civil a la que pertenece en tres (3) o más oportunidades consecutivas, sin justificación alguna;`,
  `Desconocer los lineamientos dictados por el Director General de la Defensa Civil Colombiana, el subdirector operativo y los directores seccionales de la jurisdicción a la que pertenezca el voluntario, que tengan relación directa con las actividades como voluntario adscrito a la Defensa Civil Colombiana;`,
  `No dar cumplimiento al Plan Estratégico de Seguridad Vial respecto de los vehículos propios de la Junta de Defensa Civil o los entregados en comodato o los asignados por la Defensa Civil Colombiana;`,
  `No realizar el mantenimiento preventivo y/o correctivo de los vehículos, equipos, herramientas y accesorios propios de la junta de Defensa Civil o los entregados en comodato o los asignados por la Defensa Civil Colombiana, durante su tiempo de operación;`,
  `Ocupar o utilizar indebidamente las instalaciones de la organización o de la Defensa Civil Colombiana;`,
  `Utilizar documentos o elementos de la institución en forma inapropiada;`,
  `Omitir, retardar o no suministrar oportunamente respuesta a las solicitudes o requerimientos de información generados por la Dirección General, la Subdirección Operativa y las Direcciones Seccionales;`,
  `Entorpecer por parte del voluntario las actividades o funciones de los directivos de la entidad o incumplir las actividades de apoyo como voluntario;`,
  `No informar por escrito de manera inmediata al director seccional la pérdida o daño de bienes que les han sido asignados, junto con la denuncia de hurto a que haya lugar.`
 ]},
 gravisima: { nombre:"Gravísima", art:30, sancion:"Retiro definitivo como voluntario al servicio de la entidad", ref:"Art. 32, num. 3", efecto:"Pérdida de la calidad de voluntario de la Defensa Civil Colombiana (Art. 33, num. 3).", items:[
  `Presentarse en estado de embriaguez o consumir bebidas embriagantes o sustancias psicoactivas en establecimientos o en la vía pública, portando el uniforme o realizando actividades de apoyo como voluntario;`,
  `Maltratar física o verbalmente a otro voluntario, servidor público o a algún miembro de la comunidad, en desarrollo de las actividades de apoyo como voluntario o portando el uniforme institucional;`,
  `Incurrir en conducta descrita como falta grave en dos (2) oportunidades;`,
  `Convocar o permitir la participación de aspirantes y/o voluntarios en actividades de apoyo a la entidad, sin estar previamente inscritos en el Sistema de Información Misional;`,
  `Intervenir o permitir la realización de las actividades de apoyo como voluntario a la entidad sin la autorización de la Dirección Seccional, sin el cumplimiento de los requisitos de gestión de calidad, omitiendo los requisitos y protocolos para atender actividades misionales sin la debida preparación o capacitación para hacerlo o extralimitando las facultades conferidas por este reglamento;`,
  `La no devolución u ocultamiento de los bienes recibidos por parte de la Dirección Seccional, los recibidos a través de cualquier negocio jurídico o de propiedad de la junta, una vez declarada la disolución de la organización de defensa civil;`,
  `No girar los recursos establecidos en el parágrafo 1 del artículo 149 del presente Reglamento por parte del tesorero de las juntas de Defensa Civil;`,
  `Hacer rifas, realizar juegos de azar o recolectar recursos en nombre de la entidad o de la organización;`,
  `Recibir donaciones de entidades públicas o privadas en atención a lo consagrado en el numeral 4 del artículo 151 «Prohibiciones» del presente Reglamento, para el caso de las juntas de Defensa Civil;`,
  `Comprometer a la junta de Defensa Civil con contratos y/o convenios que no se encuentren en desarrollo de sus estatutos y del apoyo que prestan a la Defensa Civil Colombiana y sin presentar el respectivo plan de inversión para la aprobación y visto bueno del director seccional, así como obligarse frente a terceros sin tener la competencia, capacidad legal y operativa para el cumplimiento de las actividades de apoyo;`,
  `Comercializar uniformes, prendas, insignias y bienes de la Defensa Civil Colombiana;`,
  `Solicitar o recibir directa o indirectamente dinero u otra utilidad, o aceptar promesa remuneratoria o cualquier otra clase de contraprestación a beneficio propio o de un tercero en nombre de la entidad o de la organización de Defensa Civil;`,
  `Realizar una conducta sancionable en la ley como delito cuando se cometa a título de dolo, o valerse de su condición de voluntario para la comisión de un hecho punible;`,
  `Imponer al voluntariado trabajos que no tengan relación alguna con el apoyo de la misionalidad de la entidad y/o con la calidad de voluntario, así como impedir o dificultar el cumplimiento de sus deberes;`,
  `Administrar en forma indebida los bienes que le han puesto a su cargo y responsabilidad mediante acta de entrega o comodato para el cumplimiento eficiente de las actividades de apoyo a la entidad, ocasionando así daños, pérdida o uso inadecuado de los mismos;`,
  `Apropiarse, directa o indirectamente, en provecho propio o de un tercero de los bienes que le fueron entregados para ser utilizados en cumplimiento de las actividades de apoyo a la entidad;`,
  `Disponer a nombre propio o de la organización bienes o de la junta de Defensa Civil empleados para el apoyo a la entidad;`,
  `Abandonar el cargo directivo de la junta de Defensa Civil sin justa causa;`,
  `Incumplir las obligaciones tributarias adquiridas por la junta de Defensa Civil a cargo de los voluntarios dignatarios;`,
  `Convocar o registrar en las asambleas de la Junta de Defensa Civil a personas que no estén acreditadas y activas como voluntarios de la Defensa Civil Colombiana;`,
  `Hacer uso indebido del emblema de protección civil, protegido por el Protocolo II Adicional a los Convenios de Ginebra de 1949;`,
  `Portar armas blancas, de fuego o cualquier otra que pueda causar lesión en acciones de apoyo a la institución o afectar su integridad y la de sus compañeros;`,
  `Utilizar el nombre, la imagen o prendas institucionales en campañas políticas;`,
  `Utilizar las redes sociales, electrónicas, internet u otro medio de difusión masiva personal o institucional, entre otros, para afectar o desprestigiar la imagen institucional, de los voluntarios y servidores públicos de la Defensa Civil Colombiana.`
 ]}
};
const DEBERES = [
 `Conocer y cumplir el presente reglamento y las políticas y directrices proferidas por la Dirección General de la entidad;`,
 `Cumplir con los deberes propios de apoyo de las actividades misionales como voluntario de la Defensa Civil Colombiana, según lo dispuesto en la Ley 1505 de 2012 o las normas que la modifiquen, deroguen o sustituyan;`,
 `Cumplir los principios y valores establecidos en el presente reglamento;`,
 `Asistir y participar en las actividades de apoyo de las actividades misionales y capacitaciones a las que haya sido convocado por la Defensa Civil Colombiana;`,
 `Asistir a las asambleas convocadas en la organización a la que pertenece;`,
 `Responder por la adecuada utilización, cuidado, mantenimiento, control y custodia de los bienes puestos a su servicio, para el apoyo prestado a la Defensa Civil Colombiana, acogiendo lo dispuesto en la normatividad vigente y en la emitida por la entidad; reportando de manera inmediata las novedades que afecten los bienes fiscales.`,
 `Responder por el uso y control de los bienes y recursos que adquieren las organizaciones de defensa civil, y aquéllos que reciban a través de cualquier otro negocio jurídico, con el fin exclusivo de apoyar la misión institucional de la entidad, previo visto bueno del Director Seccional;`,
 `Formular denuncia o queja ante autoridad competente, cuando se tenga conocimiento de situaciones irregulares, por parte de cualquier servidor público o voluntario;`,
 `Usar en debida forma los uniformes, distintivos y documentos de identificación, en actividades propias del apoyo de las actividades misionales como voluntario de la Defensa Civil Colombiana;`,
 `Registrar la asistencia a las actividades de voluntariado, al inicio y término de la misma;`,
 `Utilizar los canales de comunicación propios de la organización de defensa civil en la siguiente escala: voluntario, presidente de junta, director seccional;`,
 `Mantener la convivencia, respeto y buen trato para los servidores públicos, voluntarios y comunidad en general;`,
 `Capacitarse, ser miembro de un grupo de respuesta y atender las actividades de primera respuesta.`,
 `Divulgar las directrices impartidas por la entidad al personal de voluntarios, garantizando el cumplimiento de las actividades de apoyo a la gestión del riesgo de desastres, acción social y gestión ambiental de la organización.`,
 `Mantener su documentación actualizada de acuerdo a los procedimientos establecidos por la entidad.`
];
const PROHIB = [
 `Adelantar rifas y juegos de azar, entendidas como aquellas que realicen los voluntarios a nombre de la organización;`,
 `Solicitar, o exigir directa o indirectamente por la prestación de un apoyo en las actividades misionales, cualquier pago económico y/o material, además de agasajos, regalos, favores o cualquier otra clase de beneficios a título personal, o a nombre de la organización,`,
 `Portar el uniforme en actividades personales ajenas al cumplimiento de las actividades misionales de la Defensa Civil Colombiana;`,
 `Participar sin autorización del Director Seccional a nombre de la Organización o Entidad, en actividades relacionadas directa o indirectamente con los procesos misionales de la Defensa Civil Colombiana;`,
 `Utilizar los bienes fiscales de la Entidad o los de propiedad de la organización, así como los logos o emblemas institucionales en actividades no relacionadas con los procesos misionales de la Defensa Civil Colombiana;`,
 `Obstaculizar el derecho a la educación y preparación para la respuesta en la entidad;`,
 `Distinguir, excluir, restringir o preferir, con base en motivos de raza, color, género, origen familiar, nacional o étnico, credo religioso, preferencia política o situación social, que tengan por objeto o por resultado anular o menoscabar el reconocimiento, goce o ejercicio, en condiciones de igualdad, de los derechos humanos y libertades fundamentales en el contexto institucional;`,
 `Participar o integrar en nombre del director o quien haga sus veces de la Defensa Civil Colombiana, en los consejos territoriales de Gestión del Riesgo de Desastres dentro de la respectiva jurisdicción;`,
 `Participar o intervenir sin la debida preparación o capacitación en la realización de las actividades de apoyo misional con excepción del primer respondiente;`,
 `Omitir, retardar o no suministrar debida y oportuna respuesta a las peticiones respetuosas de los voluntarios, de los particulares o a solicitudes de las autoridades, así como retenerlas o enviarlas a destinatario diferente de aquel a quien corresponda su conocimiento;`,
 `Maltratar física o verbalmente a otro voluntario, servidor público o a algún miembro de la comunidad, en desarrollo de las actividades de apoyo como voluntario o portando el uniforme institucional;`,
 `Proporcionar datos inexactos o presentar documentos ideológicamente falsos o alterados para la realización de trámites institucionales o con relación a terceros involucrando la imagen institucional;`,
 `Ocasionar daño o dar lugar a la pérdida de bienes de forma intencional.`,
 `Los voluntarios no podrán realizar la destrucción de los bienes recibidos de la entidad; estos deberán ser devueltos a la Dirección Seccional para que pueda realizar el proceso de baja y disposición final. Los bienes recibidos en comodato de las alcaldías o gobernaciones serán devueltos al comodante. Los bienes adquiridos con recursos propios o recibidos en donación deberán ser dados de baja previa aprobación de la asamblea o del liquidador.`,
 `Prestar, alquilar o regalar prendas o cualquier otro elemento institucional a personal no vinculado en la entidad.`
];
const PRINCIPIOS = [
 {k:"Art. 6, literal a (Humanidad)", t:`Humanidad: es la razón básica de la acción humanitaria; es proteger la vida y garantizar los derechos humanos, por lo que este principio será la base de cualquier actividad desarrollada por la entidad;`},
 {k:"Art. 6, literal b (Imparcialidad)", t:`Imparcialidad: la acción humanitaria se llevará a cabo en función de la necesidad de las personas afectadas, priorizando lo urgente, sin distinción de credo, raza, ideología, género, edad, condición socio económica, entre otros;`},
 {k:"Art. 6, literal c (Independencia)", t:`Independencia: las actividades que apoyan los voluntarios de la Defensa Civil Colombiana serán autónomas de cualquier línea ideológica u otro agente humanitario en las zonas donde se desarrollen las mismas;`},
 {k:"Art. 6, literal d (Neutralidad)", t:`Neutralidad: como actores humanitarios, en cumplimiento de las actividades en las cuales apoyan a la Defensa Civil Colombiana, los voluntarios de la entidad no deberán participar en situaciones políticas, ideológicas o de orden público, de manera que puedan llegar a comprometer la imagen institucional.`},
 {k:"Art. 7, literal a (Compañerismo)", t:`Compañerismo: es apoyarse mutuamente en las actividades que realiza cada voluntario;`},
 {k:"Art. 7, literal b (Vocación de servicio)", t:`Vocación de servicio: es el compromiso, pasión y espíritu altruista de entrega al servicio de la comunidad, de manera especial y natural con las habilidades y respeto con quienes se interactúa;`},
 {k:"Art. 7, literal c (Solidaridad)", t:`Solidaridad: es la colaboración entre los voluntarios, lo que permite lograr la superación de diferentes situaciones en las que se desarrolle la misionalidad;`},
 {k:"Art. 7, literal d (Sentido de pertenencia)", t:`Sentido de pertenencia: es la convicción del voluntario de pertenecer a la institución, actuando con dedicación y transparencia, buscando el cumplimiento de sus fines y objetivos con plena conciencia;`},
 {k:"Art. 7, literal e (Trabajo en equipo)", t:`Trabajo en equipo: es direccionar las capacidades de trabajo de los demás con el fin de lograr un objetivo común;`},
 {k:"Art. 7, literal f (Honestidad)", t:`Honestidad: es actuar siempre con fundamento en la verdad, cumpliendo los deberes con transparencia y rectitud, y siempre favoreciendo el interés general;`},
 {k:"Art. 7, literal g (Respeto)", t:`Respeto: es reconocer, valorar y tratar de manera digna a todas las personas, con sus virtudes y defectos, sin importar su labor, su procedencia, títulos o cualquier otra condición;`},
 {k:"Art. 7, literal h (Compromiso)", t:`Compromiso: importancia dentro del rol como voluntario, de estar en disposición permanente para comprender y resolver las necesidades de las personas con las que se relaciona en el apoyo de la misionalidad institucional;`},
 {k:"Art. 7, literal i (Justicia)", t:`Justicia: actuar con imparcialidad garantizando los derechos de las personas, con equidad, igualdad y sin discriminación.`}
];
const ATEN = [
 `Num. 1: La buena conducta y la operatividad del voluntario o la ausencia de antecedentes`,
 `Num. 2: La confesión de la falta disciplinaria o aceptación de cargos`,
 `Num. 3: Haber procurado por iniciativa propia resarcir el daño o compensado el perjuicio causado`,
 `Num. 4: Devolver, restituir o reparar, según el caso, el bien afectado de la entidad`
];
const AGRA = [
 `Num. 1: Haber sido sancionado fiscal o disciplinariamente dentro de los cinco (5) años anteriores a la comisión de la conducta que se investiga`,
 `Num. 2: Atribuir la responsabilidad infundadamente a un tercero`,
 `Num. 3: El grave daño social de la conducta`,
 `Num. 4: La afectación a derechos fundamentales`,
 `Num. 5: El conocimiento de la ilicitud`,
 `Num. 6: Pertenecer al nivel directivo de la junta de Defensa Civil`,
 `Num. 7: Ejecutar la conducta constitutiva de falta disciplinaria por recompensa o promesa remuneratoria de un tercero`,
 `Num. 8: La naturaleza de los perjuicios causados`
];
