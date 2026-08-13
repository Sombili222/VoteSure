import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaPlus, FaCheckCircle, FaUser } from "react-icons/fa";
import AdminLayout from "../../components/layout/AdminLayout";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import PositionEditor from "./PositionEditor";
import { createElection } from "../../data/electionsData";

const STEPS = ["Details", "Positions & Candidates", "Review"];

function emptyPosition() {
  return { id: Date.now().toString(), title: "", candidates: [{ id: Date.now().toString() + 1, name: "", photo: "", manifesto: "" }] };
}

function CreateElection() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [details, setDetails] = useState({ title: "", description: "", startAt: "", endAt: "" });
  const [positions, setPositions] = useState([emptyPosition()]);

  function updatePosition(index, updated) {
    const next = [...positions];
    next[index] = updated;
    setPositions(next);
  }

  function addPosition() {
    setPositions([...positions, emptyPosition()]);
  }

  function removePosition(index) {
    setPositions(positions.filter((_, i) => i !== index));
  }

  function validateStep(currentStep) {
    if (currentStep === 0) {
      if (!details.title.trim()) return "Election title is required.";
      if (!details.startAt) return "Start date is required.";
      if (!details.endAt) return "End date is required.";
      if (new Date(details.endAt) <= new Date(details.startAt)) return "End date must be after start date.";
    }
    if (currentStep === 1) {
      if (positions.length === 0) return "Add at least one position.";
      for (const position of positions) {
        if (!position.title.trim()) return "Every position needs a title.";
        if (position.candidates.some((c) => !c.name.trim())) return "Every candidate needs a name.";
      }
    }
    return "";
  }

  function goNext() {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setStep(step + 1);
  }

  function goBack() {
    setError("");
    setStep(step - 1);
  }

  async function handlePublish() {
    setSaving(true);
    try {
      createElection({ ...details, positions });
      navigate("/admin");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AdminLayout title="Create Election">

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                index <= step ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-sm font-medium ${index === step ? "text-slate-900" : "text-slate-400"}`}>
              {label}
            </span>
            {index < STEPS.length - 1 && <div className="w-8 h-px bg-slate-200 mx-1" />}
          </div>
        ))}
      </div>

      {error && (
        <p className="text-sm text-red-500 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 mb-6">
          {error}
        </p>
      )}

      {/* Step 0: Details */}
      {step === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5 max-w-xl">
          <Input
            id="title" label="Election title" placeholder="e.g. Student Union President 2026"
            value={details.title}
            onChange={(e) => setDetails({ ...details, title: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
            <textarea
              value={details.description}
              onChange={(e) => setDetails({ ...details, description: e.target.value })}
              rows={3}
              placeholder="Brief description voters will see"
              className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-500 resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Voting opens</label>
              <input
                type="datetime-local"
                value={details.startAt}
                onChange={(e) => setDetails({ ...details, startAt: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Voting closes</label>
              <input
                type="datetime-local"
                value={details.endAt}
                onChange={(e) => setDetails({ ...details, endAt: e.target.value })}
                className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 1: Positions & Candidates */}
      {step === 1 && (
        <div className="space-y-5 max-w-xl">
          {positions.map((position, index) => (
            <PositionEditor
              key={position.id}
              position={position}
              onChange={(updated) => updatePosition(index, updated)}
              onRemove={() => removePosition(index)}
            />
          ))}
          <button
            type="button"
            onClick={addPosition}
            className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <FaPlus className="text-xs" /> Add another position
          </button>
        </div>
      )}

      {/* Step 2: Review */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-xl space-y-6">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Election</p>
            <p className="text-lg font-bold text-slate-900 mt-1">{details.title}</p>
            <p className="text-sm text-slate-500 mt-1">{details.description}</p>
            <p className="text-sm text-slate-500 mt-2">
              {new Date(details.startAt).toLocaleString()} — {new Date(details.endAt).toLocaleString()}
            </p>
          </div>

          <div className="space-y-4">
            {positions.map((position) => (
              <div key={position.id}>
                <p className="text-sm font-semibold text-slate-800">{position.title}</p>
                <ul className="mt-1.5 space-y-2">
                  {position.candidates.map((c) => (
                    <li key={c.id} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <div className="w-6 h-6 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center shrink-0">
                        {c.photo ? (
                          <img src={c.photo} alt={c.name} className="w-full h-full object-cover" />
                        ) : (
                          <FaUser className="text-slate-300 text-[10px]" />
                        )}
                      </div>
                      {c.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step navigation */}
      <div className="flex items-center gap-3 mt-8 max-w-xl">
        {step > 0 && (
          <Button
            type="button"
            onClick={goBack}
            className="bg-white border border-slate-200 text-slate-700 flex items-center gap-2"
          >
            <FaArrowLeft className="text-xs" /> Back
          </Button>
        )}

        {step < STEPS.length - 1 ? (
          <Button
            type="button"
            onClick={goNext}
            className="bg-linear-to-r from-indigo-600 to-blue-600 text-white flex items-center gap-2 ml-auto"
          >
            Next <FaArrowRight className="text-xs" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handlePublish}
            disabled={saving}
            className="bg-linear-to-r from-indigo-600 to-blue-600 text-white ml-auto"
          >
            {saving ? "Publishing..." : "Publish Election"}
          </Button>
        )}
      </div>

    </AdminLayout>
  );
}

export default CreateElection;