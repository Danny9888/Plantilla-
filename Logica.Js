document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".btn-save").addEventListener("click", function (event) {
        event.preventDefault(); // Evita que el formulario se envíe

        // Recopilar datos del formulario
        let nombreCaso = document.querySelector("input[placeholder='Ej: Registro de usuario']").value;
        let area = document.querySelector("input[placeholder='Ej: Autenticación']").value;
        let idUnico = document.querySelector("input[placeholder='Ej: UC-001']").value;
        let actores = document.querySelector("input[placeholder='Listar actores principales']").value;
        let interesados = document.querySelector("input[placeholder='Listar partes interesadas']").value;
        let nivel = document.querySelector("select").value;
        let descripcion = document.querySelector("textarea[placeholder='Descripción detallada del caso de uso...']").value;
        let evento = document.querySelector("textarea[placeholder='Evento que inicia el caso de uso...']").value;
        let prioridad = document.querySelectorAll("select")[1].value;
        let riesgo = document.querySelectorAll("select")[2].value;

        // Recopilar pasos dinámicos
        let pasos = [];
        document.querySelectorAll("#steps-body tr").forEach(row => {
            let paso = row.cells[0].textContent;
            let descripcion = row.cells[1].querySelector("input").value;
            let detalles = row.cells[2].querySelector("textarea").value;
            pasos.push(`${paso} - ${descripcion} - ${detalles}`);
        });

        // Cargar la librería jsPDF
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Agregar contenido al PDF
        doc.setFont("helvetica");
        doc.setFontSize(14);
        doc.text("Documentación de Caso de Uso", 105, 15, null, null, "center");

        let y = 25; // Posición vertical inicial

        function agregarTexto(titulo, texto) {
            doc.setFontSize(10);
            doc.text(`${titulo}: `, 15, y);
            doc.setFont("times", "italic");
            doc.text(texto, 60, y);
            doc.setFont("helvetica", "normal");
            y += 6;
        }

        // Agregar datos al PDF
        agregarTexto("Nombre del Caso de Uso", nombreCaso);
        agregarTexto("Área", area);
        agregarTexto("ID Único", idUnico);
        agregarTexto("Actor(es)", actores);
        agregarTexto("Interesados", interesados);
        agregarTexto("Nivel", nivel);
        agregarTexto("Descripción", descripcion);
        agregarTexto("Evento Desencadenador", evento);
        agregarTexto("Prioridad", prioridad);
        agregarTexto("Riesgo", riesgo);

        y += 5;
        doc.setFontSize(12);
        doc.text("Pasos Realizados:", 15, y);
        y += 5;

        // Agregar los pasos dinámicamente y manejar salto de página si es necesario
        doc.setFontSize(10);
        pasos.forEach((paso, index) => {
            if (y > 280) { // Si el contenido sobrepasa el área imprimible
                doc.addPage();
                y = 15;
            }
            doc.text(`${index + 1}. ${paso}`, 15, y);
            y += 6;
        });

        // Descargar el PDF automáticamente
        doc.save(`${nombreCaso || "Documento_Caso_Uso"}.pdf`);
    });
});
