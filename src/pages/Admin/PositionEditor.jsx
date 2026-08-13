import { FaTrash, FaPlus, FaUser } from "react-icons/fa";
import Input from "../../components/common/Input";
import { resizeImage } from "../../utils/resizeImage";

function PositionEditor({ position, onChange, onRemove }) {

  function updateTitle(title) {
    onChange({ ...position, title });
  }

  function updateCandidateField(index, field, value) {
    const nextCandidates = [...position.candidates];
    nextCandidates[index] = { ...nextCandidates[index], [field]: value };
    onChange({ ...position, candidates: nextCandidates });
  }

  async function handlePhotoChange(index, file) {
    if (!file) return;
    const resized = await resizeImage(file, 300, 0.8);
    updateCandidateField(index, "photo", resized);
  }

  function addCandidate() {
    onChange({
      ...position,
      candidates: [
        ...position.candidates,
        { id: Date.now().toString(), name: "", photo: "", manifesto: "" },
      ],
    });
  }

  function removeCandidate(index) {
    const nextCandidates = position.candidates.filter((_, i) => i !== index);
    onChange({ ...position, candidates: nextCandidates });
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6">

      <div className="flex items-start gap-3">
        <div className="flex-1">
          <Input
            id={`position-${position.id}`}
            label="Position title"
            placeholder="e.g. President"
            value={position.title}
            onChange={(e) => updateTitle(e.target.value)}
          />
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="mt-7 w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
        >
          <FaTrash className="text-sm" />
        </button>
      </div>

      <p className="text-sm font-medium text-slate-700 mt-5 mb-3">Candidates</p>

      <div className="space-y-4">
        {position.candidates.map((candidate, index) => (
          <div key={candidate.id} className="border border-slate-200 rounded-xl p-4">
            <div className="flex items-start gap-4">

              <label className="shrink-0 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handlePhotoChange(index, e.target.files[0])}
                />
                <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden hover:border-indigo-400 transition-colors">
                  {candidate.photo ? (
                    <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="text-slate-300 text-xl" />
                  )}
                </div>
              </label>

              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    value={candidate.name}
                    onChange={(e) => updateCandidateField(index, "name", e.target.value)}
                    placeholder={`Candidate ${index + 1} name`}
                    className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500"
                  />
                  {position.candidates.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCandidate(index)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shrink-0"
                    >
                      <FaTrash className="text-xs" />
                    </button>
                  )}
                </div>

                <textarea
                  value={candidate.manifesto}
                  onChange={(e) => updateCandidateField(index, "manifesto", e.target.value)}
                  placeholder="Short manifesto or bio (optional) — what should voters know about them?"
                  rows={2}
                  className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none focus:border-indigo-500 resize-none"
                />
              </div>

            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addCandidate}
        className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 mt-4"
      >
        <FaPlus className="text-xs" /> Add candidate
      </button>

    </div>
  );
}

export default PositionEditor;