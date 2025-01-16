/**
 *@NApiVersion 2.0
 *@NScriptType UserEventScript
 *
 *
 *Autor: Miguel Rodriguez
 *Prueba Técnica NetSuite - SuiteScript: "Music Store Online"
 *Date: 15/01/2025
 */
define(['N/record', 'N/search', 'N/error'], function(record, search, error) {
  const estadoIDRecibida = 1

  function afterSubmit(context) {
      try {
        if (context.type !== context.UserEventType.CREATE)
            return

        var itemIds = []
        const newRecord = context.newRecord
        var numLines = newRecord.getLineCount({
          sublistId: 'item'
          })
        for (var i = 0; i < numLines; i++) {
          const itemLine =  newRecord.getSublistValue({
            sublistId: 'item',
            fieldId: 'item',
            line: i
            })
          itemIds.push (itemLine)
        }

        var objSolicitudServicio = {
          customer: newRecord.getValue ({fieldId: 'entity'}),
          date: newRecord.getValue ({fieldId: 'trandate'}),
          serviceOrder: newRecord.id
          }

        search.create({
          type: 'item',
          filters:
            [ ['isinactive', 'is', 'F'],
             'AND',
             ['internalid', 'anyof', itemIds],
             'AND',
             ['custitem_es_instrumento', 'anyof', '1', '2']
             ],
          columns:
            [ search.createColumn({name: 'itemid', label: 'Name'})
             ]
          }).run().each(function(result){
          if (!objSolicitudServicio.hasOwnProperty('item'))
            objSolicitudServicio.item = result.id
          return true
          }) 

        if (objSolicitudServicio.hasOwnProperty('item')) {
          const newSolicitudServicio = record.create({
            type: 'customrecord_solicitud_servicio',
            isDynamic: true
          })
          newSolicitudServicio.setValue({
            fieldId: 'custrecord_solicitud_s_cliente',
            value: objSolicitudServicio.customer
            })
          newSolicitudServicio.setValue({
            fieldId: 'custrecord_solicitud_s_fecha_solicitud',
            value: objSolicitudServicio.date
            })
          newSolicitudServicio.setValue({
            fieldId: 'custrecord_solicitud_s_instrumento',
            value: objSolicitudServicio.item
            })
          newSolicitudServicio.setValue({
            fieldId: 'custrecord_solicitud_s_orden_servicio',
            value: objSolicitudServicio.serviceOrder
            })
          newSolicitudServicio.setValue({
            fieldId: 'custrecord_solicitud_s_estado',
            value: estadoIDRecibida
            })
          const newSolicitudServicioId = newSolicitudServicio.save()

          record.submitFields({
            type: 'customsale_orden_servicio',
            id: objSolicitudServicio.serviceOrder,
            values: {
              custbody_orden_s_solicitud_servicio: newSolicitudServicioId
              },
            options: {
              enableSourcing: false,
              ignoreMandatoryFields : true
              }
            })
        }
      } catch (catchError) {
        throw error.create({
                name: 'ERROR INNESPERADO',
                message: catchError.message
            })
      }
    }

  return {
        afterSubmit: afterSubmit
    }
})

        