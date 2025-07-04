/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Stepper } from "@mantine/core";
import Papa from "papaparse";
import { FiUploadCloud } from "react-icons/fi";
import { Dropzone } from "@mantine/dropzone";
import { Button } from "@/components/ui/button";
import { CircleX, FileCheck, CheckCircle, AlertTriangle } from "lucide-react";

const ImportStepper = () => {
  const [active, setActive] = useState(0);
  const [missingField, setMissingField] = useState(false);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [importStatus, setImportStatus] = useState<string | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));

  const resetStepper = () => {
    setActive(0);
    setMissingField(false);
    setImportStatus(null);
    setCsvData([]);
    setErrMsg("");
    setValidationErrors([]);
    setIsProcessing(false);
  };

  const requiredFields = ["country_code", "calling_code", "country_name"];

  // Generate and download sample CSV
  const downloadSampleCSV = () => {
    const sampleData = [
      {
        country_code: "BD",
        calling_code: "+880",
        country_name: "Bangladesh",
        default: "false",
        active: "true",
        draft: "false",
        delete: "false",
      },
      {
        country_code: "US",
        calling_code: "+1",
        country_name: "United States",
        default: "false",
        active: "true",
        draft: "false",
        delete: "false",
      },
      {
        country_code: "UK",
        calling_code: "+44",
        country_name: "United Kingdom",
        default: "true",
        active: "true",
        draft: "false",
        delete: "false",
      },
      {
        country_code: "IN",
        calling_code: "+91",
        country_name: "India",
        default: "false",
        active: "false",
        draft: "true",
        delete: "false",
      },
    ];

    const csv = Papa.unparse(sampleData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sample_countries.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Validate required fields
  const validateRequiredFields = (data: any[]) => {
    if (!data || data.length === 0) {
      return { isValid: false, missingFields: ["No data found"] };
    }

    const firstRow = data[0];
    const missingFields: string[] = [];

    requiredFields.forEach((field) => {
      if (
        !Object.prototype.hasOwnProperty.call(firstRow, field) ||
        firstRow[field] === undefined ||
        firstRow[field] === ""
      ) {
        missingFields.push(field);
      }
    });

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  };

  // Convert string boolean values to actual booleans
  const convertStringToBoolean = (value: any): boolean => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") {
      return value.toLowerCase() === "true" || value === "1";
    }
    return Boolean(value);
  };

  const handleFileUpload = (files: any) => {
    setMissingField(false);
    setValidationErrors([]);
    setIsProcessing(true);

    const file = files?.[0];
    if (!file) {
      setIsProcessing(false);
      return;
    }

    // Check if file is CSV
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setErrMsg("Please upload a CSV file only.");
      setMissingField(true);
      setIsProcessing(false);
      return;
    }

    nextStep();

    Papa.parse(file, {
      complete: (result: any) => {
        setIsProcessing(false);

        if (result.errors && result.errors.length > 0) {
          setErrMsg("Error parsing CSV file. Please check the file format.");
          setMissingField(true);
          return;
        }

        const validation = validateRequiredFields(result.data);

        if (!validation.isValid) {
          setValidationErrors(validation.missingFields);
          setMissingField(true);
          return;
        }

        // Process and transform the data
        const updatedData = result.data
          .filter(
            (row: any) => row.country_code && row.country_code.trim() !== ""
          ) // Filter out empty rows
          .map((row: any, index: number) => ({
            id: index + 1, // Generate sequential ID
            country_code: row.country_code?.trim().toUpperCase(),
            calling_code: row.calling_code?.trim(),
            country_name: row.country_name?.trim(),
            is_default: convertStringToBoolean(row.default),
            is_active: convertStringToBoolean(row.active),
            draft: convertStringToBoolean(row.draft),
            is_deleted: convertStringToBoolean(row.delete),
            // Additional fields for database
            name_in_bangla: null,
            name_in_arabic: null,
            flag: null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            deleted_at: convertStringToBoolean(row.delete)
              ? new Date().toISOString()
              : null,
          }));

        if (updatedData.length === 0) {
          setErrMsg("No valid data found in the CSV file.");
          setMissingField(true);
          return;
        }

        setCsvData(updatedData);
      },
      header: true,
      skipEmptyLines: true,
      transformHeader: (header: string) => header.trim().toLowerCase(),
    });
  };

  const handleImport = async () => {
    setErrMsg("");
    if (!csvData) return;

    console.log("Importing countries:", csvData);
    nextStep();
    setIsProcessing(true);

    try {
      // Simulate API call - replace with your actual import API
      // const res = await importCountry({ countries: csvData }).unwrap();

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate success/error randomly for demo
      const isSuccess = false; // 70% success rate for demo

      if (isSuccess) {
        setImportStatus("success");
      } else {
        setImportStatus("error");
        setErrMsg(
          "Failed to import some countries. Please check the data and try again."
        );
      }
    } catch (err: any) {
      console.error("Import error:", err);
      setImportStatus("error");
      setErrMsg(
        err?.data?.message || "An unexpected error occurred during import."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Stepper mih={220} active={active} color="var(--primary)">
        <Stepper.Step label="Upload File">
          <div className="h-[17rem]">
            <Dropzone
              onDrop={handleFileUpload}
              radius={10}
              loading={isProcessing}
              accept={["text/csv", ".csv"]}
              className="h-full"
              disabled={isProcessing}
            >
              <div className="h-[15rem] p-4 border-2 bg-gray-100 rounded-md flex flex-col cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-600">
                  <FiUploadCloud className="text-2xl" />
                  <p className="mt-2">
                    {isProcessing
                      ? "Processing file..."
                      : "Drag and drop a file or click"}
                  </p>
                  <p className="text-xs text-primary-500">
                    Note: Only .CSV format is accepted.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Required fields: country_code, calling_code, country_name
                  </p>
                </div>
              </div>
            </Dropzone>
            <div>
              <Button
                className="mt-3 rounded-full bg-primary text-white"
                onClick={downloadSampleCSV}
                variant="outline"
                disabled={isProcessing}
              >
                Download Sample CSV
              </Button>
            </div>
          </div>
        </Stepper.Step>

        <Stepper.Step label="Match Fields">
          <div className="h-[17rem] flex items-center justify-center">
            {missingField ? (
              <div className="flex flex-col items-center justify-center py-5">
                <CircleX size={80} className="text-red-400 mb-3" />
                <h3 className="text-2xl font-semibold text-red-400">
                  Failed to Import!
                </h3>
                <p className="text-lg font-semibold mb-2">
                  {errMsg || "Fields validation failed!"}
                </p>
                {validationErrors.length > 0 && (
                  <div className="text-center">
                    <p className="text-sm font-medium text-red-500 mb-2">
                      Missing required fields:
                    </p>
                    <ul className="list-disc list-inside text-red-500 text-sm">
                      {validationErrors.map((field, index) => (
                        <li key={index}>{field}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-5">
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={resetStepper}
                  >
                    Back to Upload
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-5">
                <FileCheck size={80} className="text-green-500 mb-3" />
                <h3 className="text-2xl font-semibold text-green-500">
                  Fields Matched Successfully!
                </h3>
                <p className="text-sm text-gray-600 mt-2">
                  Found {csvData?.length || 0} countries ready to import
                </p>
                <div className="mt-5 flex gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary"
                    onClick={resetStepper}
                  >
                    Back
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-primary"
                    onClick={handleImport}
                  >
                    Continue Import
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Stepper.Step>

        <Stepper.Step label="Import Countries">
          <div className="h-[17rem] flex items-center justify-center">
            {importStatus === "success" ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-5">
                <CheckCircle size={80} className="text-green-500 mb-3" />
                <h3 className="text-2xl font-semibold text-green-500">
                  Import Completed Successfully!
                </h3>
                <p className="text-sm text-gray-600">
                  {csvData?.length || 0} countries have been imported
                  successfully.
                </p>
                <div className="mt-5">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary"
                    onClick={resetStepper}
                  >
                    Import More Countries
                  </Button>
                </div>
              </div>
            ) : importStatus === "error" ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-5">
                <AlertTriangle size={80} className="text-red-500 mb-3" />
                <h3 className="text-2xl font-semibold text-red-500">
                  Import Failed!
                </h3>
                <p className="text-sm text-red-500 text-center max-w-md">
                  {errMsg || "An error occurred during the import process."}
                </p>
                <div className="mt-5 flex gap-3">
                  <Button
                    variant="outline"
                    className="rounded-full border-primary"
                    onClick={resetStepper}
                  >
                    Start Over
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-primary"
                    onClick={handleImport}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Retrying..." : "Try Again"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-5">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-center text-lg font-medium">
                  {isProcessing
                    ? "Processing Import..."
                    : "Preparing Import..."}
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Please wait while we import your countries
                </p>
              </div>
            )}
          </div>
        </Stepper.Step>
      </Stepper>
    </>
  );
};

export default ImportStepper;
