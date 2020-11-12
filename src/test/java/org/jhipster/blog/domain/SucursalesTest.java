package org.jhipster.blog.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.jhipster.blog.web.rest.TestUtil;

public class SucursalesTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Sucursales.class);
        Sucursales sucursales1 = new Sucursales();
        sucursales1.setId(1L);
        Sucursales sucursales2 = new Sucursales();
        sucursales2.setId(sucursales1.getId());
        assertThat(sucursales1).isEqualTo(sucursales2);
        sucursales2.setId(2L);
        assertThat(sucursales1).isNotEqualTo(sucursales2);
        sucursales1.setId(null);
        assertThat(sucursales1).isNotEqualTo(sucursales2);
    }
}
