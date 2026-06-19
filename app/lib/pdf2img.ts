export async function convertPdfToImage(file: File) {
    if (typeof window === "undefined") {
        throw new Error("PDF conversion only works in browser");
    }

    const pdfjsLib = await import("pdfjs-dist");
    const workerUrl = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
    ).toString();

    pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({
        canvasContext: ctx,
        viewport,
    }).promise;

    return await new Promise((resolve) => {
        canvas.toBlob((blob) => {
            if (!blob) return resolve(null);

            resolve({
                imageUrl: URL.createObjectURL(blob),
                file: new File([blob], "resume.png", {
                    type: "image/png",
                }),
            });
        }, "image/png");
    });
}