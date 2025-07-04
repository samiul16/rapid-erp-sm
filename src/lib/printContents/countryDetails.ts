/* eslint-disable @typescript-eslint/no-explicit-any */
export default function countryDetailPrintContentList(countries: any[]) {
  const countryCards = countries
    .map((countryData, index) => {
      return `
          <div class="print-container max-w-2xl mx-auto p-6 rounded-lg border border-gray-300 shadow-sm space-y-6 bg-white mb-8">
            <h2 class="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
              Country Details ${countries.length > 1 ? `#${index + 1}` : ""}
            </h2>
            <div class="grid grid-cols-2 gap-y-4 gap-x-2 text-sm border-b pb-2">
            ${
              countryData?.code
                ? `<div class="font-semibold text-gray-800">Code:</div>
              <div class="text-gray-600">${countryData?.code ?? "-"}</div>`
                : ""
            }  
            ${
              countryData?.title
                ? `<div class="font-semibold text-gray-800">Name:</div>
              <div class="text-gray-600">${countryData?.title ?? "-"}</div>`
                : ""
            }  
            ${
              countryData?.createdAt
                ? `<div class="font-semibold text-gray-800">Created Time:</div>
              <div class="text-gray-600">${countryData?.createdAt ?? "-"}</div>`
                : ""
            }  
            ${
              countryData?.deletedAt
                ? `<div class="font-semibold text-gray-800">Deleted Time:</div>
              <div class="text-gray-600">${countryData?.deletedAt ?? "-"}</div>`
                : ""
            }  
            ${
              countryData?.isDraft
                ? `<div class="font-semibold text-gray-800">Draft:</div>
              <div class="text-gray-600">${
                countryData?.isDraft ? "Yes" : "No"
              }</div>`
                : ""
            }  
            ${
              countryData?.draftedAt
                ? `<div class="font-semibold text-gray-800">Drafted Time:</div>
              <div class="text-gray-600">${countryData?.draftedAt ?? "-"}</div>`
                : ""
            }  
            ${
              countryData?.name_in_arabic
                ? `<div class="font-semibold text-gray-800">Name in Arabic:</div>
              <div class="text-gray-600">${
                countryData?.name_in_arabic ?? "-"
              }</div>`
                : ""
            }  
            ${
              countryData?.isPrint
                ? `<div class="font-semibold text-gray-800">Print:</div>
              <div class="text-gray-600">${
                countryData?.isPrint ? "Yes" : "No"
              }</div>`
                : ""
            }  
            ${
              countryData?.isActive
                ? `<div class="font-semibold text-gray-800">Status:</div>
              <div class="text-gray-600">${
                countryData?.isActive ? "Active" : "Inactive"
              }</div>`
                : ""
            }  
            </div>
          </div>
        `;
    })
    .join("");

  return `<div class="print-wrapper">${countryCards}</div>`;
}
