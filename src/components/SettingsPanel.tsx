export const SettingsPanel = () => {
  return (
    <div className="settings-panel">
      <h3>Настройки</h3>
      <label>
        <input type="checkbox" /> Темная тема
      </label>
      <label>
        <input type="checkbox" /> Горячие клавиши
      </label>
      <label>
        <input type="checkbox" /> Автосохранение
      </label>
    </div>
  );
};