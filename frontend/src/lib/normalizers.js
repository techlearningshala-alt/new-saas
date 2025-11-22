function normalizeComponent(component) {
  if (!component) return component;
  if (Array.isArray(component)) {
    return component.map(normalizeComponent);
  }

  if (component?.data && component?.data?.attributes) {
    return {
      id: component.data.id,
      ...component.data.attributes
    };
  }

  if (component?.__component) {
    const normalized = { ...component };
    Object.keys(normalized).forEach((key) => {
      if (key === '__component') return;
      normalized[key] = normalizeComponent(normalized[key]);
    });
    return normalized;
  }

  if (typeof component === 'object' && component !== null) {
    return Object.entries(component).reduce((acc, [key, value]) => {
      acc[key] = normalizeComponent(value);
      return acc;
    }, {});
  }

  return component;
}

export function normalizeLandingPageResponse(payload) {
  if (!payload?.data?.length) {
    return null;
  }

  const entry = payload.data[0];
  const attributes = entry.attributes ?? {};

  return {
    id: entry.id,
    ...attributes,
    sections: normalizeComponent(attributes.sections ?? []),
    theme: normalizeComponent(attributes.theme),
    seo: normalizeComponent(attributes.seo),
    template: attributes.template
      ? normalizeTemplate(attributes.template)
      : undefined
  };
}

function normalizeTemplate(template) {
  if (!template?.data) return undefined;
  const attributes = template.data.attributes ?? {};
  return {
    id: template.data.id,
    ...attributes,
    sections: normalizeComponent(attributes.sections ?? []),
    defaultTheme: normalizeComponent(attributes.defaultTheme),
    seo: normalizeComponent(attributes.seo)
  };
}
