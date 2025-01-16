# AVERA_Test
Este repositorio contiene la información relacionada a la prueba Técnica NetSuite - SuiteScript: "Music Store Online"

Para el correcto funcionamiento del flujo y los scripts se requiere de la creación de los siguientes registros

------------------------------------------------------------
Custom List

Name
Tipo de Cliente
ID
customlist_tipo_cliente

Name
Estado
ID
customlist_solicitud_s_estado

Name
Estado de la Orden
ID
customlist_orden_s_estado_orden

Name
Solicitud de Servicio Palabras
ID
customlist_solicitud_servicio_palabras

Name
Categoría Instrumento
ID
customlist_categoria_instrumento

------------------------------------------------------------
Custom Entity Field

Label
Tipo de Cliente
ID
custentity_tipo_cliente

------------------------------------------------------------
Custom Item Field

Label
Es Instrumento
ID
custitem_es_instrumento

------------------------------------------------------------
Custom Record Type

Name
Solicitud de Servicio
ID
customrecord_solicitud_servicio

------------------------------------------------------------
Custom Entry Form

Name
Custom Solicitud de Servicio Form
ID
custform_300_5644658_sb1_322
Type
Custom Record
Record Type
Solicitud de Servicio
Script Name
MSO_Solicitudes_Servicio_CS.js

------------------------------------------------------------
Custom Transaction Type

Name
Orden de Servicio
ID
customsale_orden_servicio

------------------------------------------------------------
Script

Type
User Event
Name
MSO Solicitudes Servicio UE
ID
customscript_mso_solicitudes_servicio_ue
Script File
MSO_Solicitudes_Servicio_UE.js

Type
Map/Reduce
Name
MSO Clasificación de Clientes MR
ID
customscript_mso_clasificacion_client_mr
Script File
MSO_Solicitudes_Servicio_MR.js




Todos los detalles han sido explicados a detalle y con apoyo gráfico en el archivo "Prueba Técnica NetSuite.pdf"
