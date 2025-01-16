/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 *
 *
 *Autor: Miguel Rodriguez
 *Prueba Técnica NetSuite - SuiteScript: "Music Store Online"
 *Date: 15/01/2025
 */
define(['N/error', 'N/query'], function(error, query) {

    function saveRecord(context) {
      return validateDescription(context.currentRecord)
    }

    function validateField(context) {
        var currentRecord = context.currentRecord
        var sublistFieldName = context.fieldId
        if (sublistFieldName === 'custrecord_solicitud_s_descripcion')
          validateDescription(currentRecord)
       return true
    }

    function validateDescription(currentRecord) {
      try {
        var returnFunction = true
        const description = currentRecord.getValue({fieldId: 'custrecord_solicitud_s_descripcion'})
        const descriptionLength = description.length
        if (descriptionLength < 30) {
          alert('La descripción ingresada no cuenta con el tamaño mínimo. (30 Caracteres)')
          returnFunction = false
        }
        var forbiddens = []
        var queryResults = query.runSuiteQL({query: 'SELECT Name FROM customlist_solicitud_servicio_palabras'})
        for (var i = 0; i < queryResults.results.length; i++) {
          if (description.includes(queryResults.results[i].values[0])) {
            forbiddens.push(queryResults.results[i].values[0])
          }
        }
        if (forbiddens.length > 0) {
          alert('La descripción ingresada contiene palabras ofensivas: ' + forbiddens.join())
          returnFunction = false
        }
        
        return returnFunction
      } catch (catchError) {
        throw error.create({
                name: 'ERROR INNESPERADO',
                message: catchError.message
             })
      }
    }
    
    return {
        validateField: validateField,
        saveRecord: saveRecord
    };
}); 

        